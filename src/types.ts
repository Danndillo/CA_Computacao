export type NewsCategory =
  | 'Comunicados'
  | 'Representação estudantil'
  | 'Atividades acadêmicas'
  | 'Eventos'
  | 'Oportunidades'

export interface NewsPost {
  id: string
  title: string
  /** Imagem de capa opcional. Sem imagem, o site usa um padrão gráfico da categoria. */
  cover?: { src: string; alt: string }
  dateLabel: string
  isoDate?: string
  category: NewsCategory
  summary: string
  body: string[]
  urgent?: boolean
  /** Conteúdo demonstrativo. Some automaticamente quando houver publicações reais. */
  demo?: boolean
}

export interface EventItem {
  id: string
  name: string
  description: string
  dateLabel: string
  isoDate?: string
  time: string
  place: string
  image?: { src: string; alt: string }
  registrationUrl?: string
  status: 'proximos' | 'anteriores'
  demo?: boolean
}

export interface Member {
  id: string
  name: string
  role: string
  bio?: string
  photo?: { src: string; alt: string }
  links?: { label: string; href: string }[]
  /** Cartão ainda não preenchido com dados oficiais. */
  placeholder?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  objective: string
  owners: string
  status: string
  howToJoin: string
  image?: { src: string; alt: string }
  demo?: boolean
}

export type DocCategory =
  | 'Estatuto'
  | 'Atas e assembleias'
  | 'Editais e comunicados oficiais'
  | 'Documentos institucionais'
  | 'Relatórios de atividades'
  | 'Outros arquivos'

export interface DocItem {
  id: string
  title: string
  category: DocCategory
  dateLabel: string
  description: string
  href: string
  /** Quem produziu o documento. */
  source?: string
}

export interface Complementar {
  code: string
  description: string
  /** O relatório da UFES corta o texto no fim da linha. */
  truncated?: boolean
  type: string
  typeTruncated?: boolean
  /** CH total conforme o relatório. null quando o campo está em branco. */
  ch: number | null
}
