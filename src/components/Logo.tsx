/**
 * MARCA PROVISÓRIA.
 * O arquivo oficial do logotipo não foi enviado, então esta coruja é um desenho próprio
 * (asas abertas, circuitos, emblema circular) nas cores da identidade.
 * Para usar o logotipo oficial, substitua o conteúdo de <OwlMark /> por <img src="..."> ou pelo SVG original.
 */
export function OwlMark({ className = '', title }: { className?: string; title?: string }) {
  const Wing = (
    <g>
      <path d="M72 38 14 14l7 14 51 24Z" fill="#F26F20" />
      <path d="M72 54 6 36l8 15 58 13Z" fill="#E66E25" />
      <path d="M72 67 4 60l9 14 59 3Z" fill="#F26F20" />
      <path d="M72 80 12 86l12 12 52-10Z" fill="#E66E25" />
      <path d="M62 36 38 25h-9M58 52 30 44h-8M60 66H26m34 14-26 6h-6" fill="none" stroke="#020101" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="29" cy="25" r="2.4" fill="#020101" />
      <circle cx="22" cy="44" r="2.4" fill="#020101" />
      <circle cx="26" cy="66" r="2.4" fill="#020101" />
      <circle cx="28" cy="86" r="2.4" fill="#020101" />
    </g>
  )
  return (
    <svg
      viewBox="0 0 200 112"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {Wing}
      <g transform="translate(200 0) scale(-1 1)">{Wing}</g>
      <circle cx="100" cy="56" r="42" fill="#020101" stroke="#F26F20" strokeWidth="5" />
      <circle cx="100" cy="56" r="35.5" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="1.5 4" />
      <path d="M72 27 86 39h28l14-12 3 31-31 31-31-31Z" fill="#F26F20" />
      <path d="M78 46 94 52M122 46 106 52" stroke="#020101" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="86" cy="57" r="10.5" fill="#fff" />
      <circle cx="114" cy="57" r="10.5" fill="#fff" />
      <circle cx="86" cy="58" r="4.6" fill="#020101" />
      <circle cx="114" cy="58" r="4.6" fill="#020101" />
      <path d="M95 68h10l-5 11Z" fill="#020101" />
      <path d="M86 84h28M92 90h16" stroke="#F26F20" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="display text-[1.05rem] tracking-tight text-white">CA Computação</span>
      <span className="eyebrow mt-1 text-[0.62rem] tracking-[0.18em] text-white/65">UFES · Alegre</span>
    </span>
  )
}
