/** Marca provisória: monograma "CA". Troque por <img> com o logotipo oficial quando ele estiver disponível. */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`display grid shrink-0 place-items-center rounded-md bg-orange text-night ${className}`}
      style={{ fontStretch: '100%' }}
    >
      CA
    </span>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex min-w-0 flex-col leading-none ${className}`}>
      <span className="display truncate text-[1.05rem] tracking-tight text-white" style={{ fontStretch: '100%' }}>
        CA Computação
      </span>
      <span className="eyebrow mt-1 text-[0.62rem] tracking-[0.18em] text-white/65">UFES · Alegre</span>
    </span>
  )
}
