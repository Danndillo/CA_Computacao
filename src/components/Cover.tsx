import type { NewsCategory } from '../types'

const ORANGE = '#F26F20'
const BURNT = '#E66E25'
const GRAPHITE = '#463E3A'

const variants: Record<NewsCategory | 'default', number> = {
  Comunicados: 0,
  'Representação estudantil': 1,
  'Atividades acadêmicas': 2,
  Eventos: 3,
  Oportunidades: 4,
  default: 0,
}

/** Capa gráfica gerada pela categoria, usada quando a publicação não tem imagem. Decorativa. */
export function Cover({ category = 'default', className = '' }: { category?: NewsCategory | 'default'; className?: string }) {
  const v = variants[category]
  const cols = Array.from({ length: 20 }, (_, i) => i)
  const rows = Array.from({ length: 6 }, (_, i) => i)
  return (
    <div className={`overflow-hidden bg-night ${className}`} aria-hidden="true">
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
        {v === 0 &&
          rows.map((r) =>
            cols.map((c) => (
              <circle key={`${r}-${c}`} cx={10 + c * 16} cy={22 + r * 28} r={(r * 7 + c * 3) % 5 === 0 ? 4.5 : 2.4} fill={(r * 7 + c * 3) % 5 === 0 ? ORANGE : GRAPHITE} />
            )),
          )}
        {v === 1 &&
          [18, 40, 62, 84, 106, 128].map((r, i) => (
            <circle key={r} cx="240" cy="110" r={r} fill="none" stroke={i % 2 ? GRAPHITE : ORANGE} strokeWidth={i % 2 ? 1.5 : 3} />
          ))}
        {v === 2 &&
          rows.map((r) =>
            cols.map((c) => {
              const on = (r * 5 + c * 7) % 6 === 0
              return <rect key={`${r}-${c}`} x={10 + c * 15} y={14 + r * 27} width="9" height="9" fill={on ? ORANGE : GRAPHITE} opacity={on ? 1 : 0.7} />
            }),
          )}
        {v === 3 &&
          Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${-20 + i * 46} 190 L${40 + i * 46} -10 L${58 + i * 46} -10 L${-2 + i * 46} 190Z`} fill={i % 3 === 0 ? ORANGE : i % 3 === 1 ? BURNT : GRAPHITE} opacity={i % 3 === 2 ? 0.8 : 1} />
          ))}
        {v === 4 && (
          <g fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M0 40h90l30 30h70l24-24h106" />
            <path d="M0 100h60l24 24h110l30-30h96" stroke={GRAPHITE} />
            <path d="M0 150h140l22-22h158" />
            <circle cx="90" cy="40" r="5" fill="#020101" />
            <circle cx="194" cy="124" r="5" fill="#020101" />
            <circle cx="300" cy="94" r="5" fill="#020101" />
          </g>
        )}
      </svg>
    </div>
  )
}
