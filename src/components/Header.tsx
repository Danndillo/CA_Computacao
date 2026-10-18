import { useEffect, useRef, useState } from 'react'
import { nav } from '../content/site'
import type { PageName, Route } from '../lib/route'
import { useTheme } from '../lib/useTheme'
import { Icon } from './Icon'
import { Monogram, Wordmark } from './Logo'

const activeFor = (page: PageName): PageName => (page === 'noticia' ? 'noticias' : page)

export function Header({ route }: { route: Route }) {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const menuBtn = useRef<HTMLButtonElement>(null)
  const current = activeFor(route.page)

  useEffect(() => setOpen(false), [route.page, route.id])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="on-dark sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-graphite bg-night text-white">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="CA Computação UFES Alegre, página inicial">
          <Monogram className="h-9 w-9 text-lg" />
          <Wordmark />
        </a>

        <nav aria-label="Principal" className="hidden nav:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const on = item.page === current
              return (
                <li key={item.page}>
                  <a
                    href={`#${item.page}`}
                    aria-current={on ? 'page' : undefined}
                    className={`relative block px-3 py-2 text-[0.9rem] font-medium transition-colors ${on ? 'text-white' : 'text-white/70 hover:text-white'}`}
                  >
                    {item.label}
                    <span aria-hidden="true" className={`absolute inset-x-3 -bottom-px h-[3px] bg-orange transition-transform duration-200 origin-left ${on ? 'scale-x-100' : 'scale-x-0'}`} />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            className="grid h-11 w-11 place-items-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button
            ref={menuBtn}
            type="button"
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-md text-white transition-colors hover:bg-white/10 nav:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movel" aria-label="Menu móvel" className="border-t border-graphite bg-night nav:hidden">
          <ul className="wrap grid grid-cols-1 gap-px py-3 min-[480px]:grid-cols-2">
            {nav.map((item) => {
              const on = item.page === current
              return (
                <li key={item.page}>
                  <a
                    href={`#${item.page}`}
                    aria-current={on ? 'page' : undefined}
                    className={`flex min-h-[48px] items-center justify-between rounded-md px-3 text-base font-medium ${on ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.label}
                    {on && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-orange" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
