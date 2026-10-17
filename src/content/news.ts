import type { NewsCategory, NewsPost } from '../types'

export const newsCategories: NewsCategory[] = [
  'Comunicados',
  'Representação estudantil',
  'Atividades acadêmicas',
  'Eventos',
  'Oportunidades',
]

/** Publicações reais. Adicione aqui (ou ligue a um CMS em services/content.ts). */
export const news: NewsPost[] = []

/** Modelos para mostrar o layout. Somem sozinhos quando `news` tiver itens. */
export const newsDemo: NewsPost[] = [
  {
    id: 'modelo-urgente',
    title: '[Modelo] Comunicado urgente com destaque',
    dateLabel: '[Data de publicação]',
    category: 'Comunicados',
    urgent: true,
    demo: true,
    summary: 'Comunicados urgentes ganham um bloco escuro com rótulo e ícone, sem depender só de cor.',
    body: [
      'Este texto é apenas um modelo de comunicado urgente.',
      'Substitua título, data, resumo e conteúdo pelas informações oficiais da gestão.',
    ],
  },
  {
    id: 'modelo-representacao',
    title: '[Modelo] Notícia sobre representação estudantil',
    dateLabel: '[Data de publicação]',
    category: 'Representação estudantil',
    demo: true,
    summary: 'Resumo curto da publicação, com no máximo duas ou três linhas.',
    body: ['Conteúdo completo da publicação. Aceita vários parágrafos.', 'Cada item da lista abaixo é um parágrafo.'],
  },
  {
    id: 'modelo-academica',
    title: '[Modelo] Informe sobre atividades acadêmicas',
    dateLabel: '[Data de publicação]',
    category: 'Atividades acadêmicas',
    demo: true,
    summary: 'A capa vem de um padrão gráfico da categoria quando a publicação não tem imagem.',
    body: ['Conteúdo completo da publicação.'],
  },
  {
    id: 'modelo-oportunidade',
    title: '[Modelo] Divulgação de oportunidade',
    dateLabel: '[Data de publicação]',
    category: 'Oportunidades',
    demo: true,
    summary: 'Estágios, bolsas, monitorias e outras chances para estudantes do curso.',
    body: ['Conteúdo completo da publicação.'],
  },
]
