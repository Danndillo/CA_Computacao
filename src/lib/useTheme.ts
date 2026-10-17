import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'ca-theme'

function read(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)')

/** Tema claro/escuro. Sem escolha explícita, segue o sistema. */
export function useTheme() {
  const [explicit, setExplicit] = useState<Theme | null>(read)
  const [sys, setSys] = useState<Theme>(() => (systemDark().matches ? 'dark' : 'light'))

  useEffect(() => {
    const mq = systemDark()
    const onChange = () => setSys(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (explicit) root.setAttribute('data-theme', explicit)
    else root.removeAttribute('data-theme')
  }, [explicit])

  const theme: Theme = explicit ?? sys
  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setExplicit(next)
    try { localStorage.setItem(KEY, next) } catch { /* sem armazenamento: vale só nesta visita */ }
  }, [theme])

  return { theme, toggle }
}
