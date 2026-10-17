import type { DocCategory, DocItem } from '../types'

export const docCategories: DocCategory[] = [
  'Estatuto',
  'Atas e assembleias',
  'Editais e comunicados oficiais',
  'Documentos institucionais',
  'Relatórios de atividades',
  'Outros arquivos',
]

/**
 * Documentos publicados pela gestão. Não há modelos demonstrativos aqui de propósito:
 * documento só aparece se for real. Cada item precisa de um `href` de acesso ou download.
 */
export const documents: DocItem[] = [
  {
    id: 'ufes-atividades-complementares-2020',
    title: 'Atividades Complementares por Unidade (Modelo UFES)',
    category: 'Documentos institucionais',
    dateLabel: 'Emitido em 04/03/2020',
    description:
      'Relatório do Colegiado do Curso com as atividades complementares e suas cargas horárias. Disponível em tabela pesquisável nesta página.',
    href: '#complementares',
    source: 'UFES · Colegiado do Curso',
  },
]
