import { useEffect, useSyncExternalStore } from 'react'

export type PageName =
  | 'inicio' | 'sobre' | 'integrantes' | 'noticias' | 'noticia' | 'eventos'
  | 'projetos' | 'documentos' | 'complementares' | 'contato' | 'nao-encontrada'

export interface Route { page: PageName; id?: string }

const SIMPLE: PageName[] = [
  'inicio', 'sobre', 'integrantes', 'noticias', 'eventos',
  'projetos', 'documentos', 'complementares', 'contato',
]

/** Rotas por hash simples (#sobre, #noticia-meu-id): funcionam em qualquer hospedagem estática. */
export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, '')
  if (!raw) return { page: 'inicio' }
  if (raw.startsWith('noticia-') && raw.length > 8) return { page: 'noticia', id: raw.slice(8) }
  if ((SIMPLE as string[]).includes(raw)) return { page: raw as PageName }
  return { page: 'nao-encontrada' }
}

export const newsHref = (id: string) => `#noticia-${id}`

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
const snapshot = () => window.location.hash

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, snapshot, () => '')
  return parseHash(hash)
}

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · CA Computação UFES Alegre` : 'CA Computação UFES Alegre'
  }, [title])
}

/** Link absoluto para uma rota, usado em "Copiar link". */
export function absoluteLink(hash: string) {
  return `${window.location.origin}${window.location.pathname}${hash}`
}
