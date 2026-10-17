/** Fita perfurada: o motivo gráfico do site. Decorativa. */
export function Tape({ className = '', drift = false }: { className?: string; drift?: boolean }) {
  return <div aria-hidden="true" className={`tape ${drift ? 'drift' : ''} ${className}`} />
}
