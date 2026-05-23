/**
 * 이미지 파일을 canvas로 리사이즈 + JPEG 압축해서 dataURL로 반환.
 * localStorage(보통 5~10MB)에 부담 없이 들어가도록 크기를 줄인다.
 *
 * - maxWidth: 가로 최대 픽셀 (기본 1200)
 * - quality: 0.0~1.0 (기본 0.82)
 * - PNG/투명도가 필요하면 type='image/png' 로 호출.
 */
export async function compressImage(
  file: File,
  {
    maxWidth = 1200,
    quality = 0.82,
    type = 'image/jpeg',
  }: { maxWidth?: number; quality?: number; type?: string } = {},
): Promise<string> {
  // SVG는 그대로 dataURL 반환 (벡터를 래스터화하면 손해)
  if (file.type === 'image/svg+xml') return readAsDataURL(file)

  const bitmap = await loadBitmap(file)

  // 원본보다 크게 키우지 않는다
  const targetW = Math.min(maxWidth, bitmap.width)
  const ratio = targetW / bitmap.width
  const targetH = Math.round(bitmap.height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas context unavailable')

  // 부드러운 다운스케일
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, targetW, targetH)

  return canvas.toDataURL(type, quality)
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = () => reject(r.error)
    r.readAsDataURL(file)
  })
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  // 가능하면 createImageBitmap (빠르고 메모리 효율적)
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file)
    } catch {
      // fallthrough
    }
  }
  // 폴백: HTMLImageElement
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error('이미지 로드 실패'))
      el.src = url
    })
    return img
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** 대략적인 dataURL 바이트 크기 (KB) — UI에 표시용 */
export function approxKB(dataUrl: string): number {
  // base64는 원본 대비 약 4/3 크기
  const head = dataUrl.indexOf(',')
  const body = head >= 0 ? dataUrl.slice(head + 1) : dataUrl
  return Math.round((body.length * 3) / 4 / 1024)
}
