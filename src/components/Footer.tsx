import { Link } from 'react-router-dom'
import { navLinks, site } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-ink">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm text-ink-soft">
              {site.description}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              Pages
            </p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-soft hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              Follow
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-ink hover:text-accent"
            >
              Instagram {site.instagramHandle} →
            </a>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-mute">
              Base
            </p>
            <p className="mt-2 text-sm text-ink-soft">{site.location}</p>
          </div>
        </div>

        <div className="rule mt-12 flex flex-col items-start justify-between gap-2 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            Made by{' '}
            <a
              href="https://efface.dev"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              efface
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
