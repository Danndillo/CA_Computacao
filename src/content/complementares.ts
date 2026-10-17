import type { Complementar } from '../types'

/**
 * Fonte: relatório 11.02.01.99.56 "Atividades Complementares por Unidade (Modelo UFES)",
 * Colegiado do Curso de Ciências da Computação, emitido em 04/03/2020, 14:44 (37 atividades).
 * Textos e valores transcritos do PDF, na ordem do relatório.
 * `truncated`: o relatório corta a descrição no fim da linha.
 * `ch: null`: o campo CH_Total está em branco no relatório.
 */
export const complementaresSource = {
  report: '11.02.01.99.56 · Atividades Complementares por Unidade (Modelo UFES)',
  unit: 'Colegiado do Curso de Ciências da Computação',
  unitCode: '7.02.12.30.00.00.00.00',
  issuedAt: '04/03/2020',
  total: 37,
}

const ATIVIDADES_PENDENTES = 'Atividade voluntária em pesquisa, ensino e'
const APRESENTACAO = 'Apresentação de Trabalhos - Congressos e'

export const complementares: Complementar[] = [
  { code: 'ATV01604', description: 'Atividades esportivas - participação nas atividades esportivas', type: 'Outras atividades', ch: null },
  { code: 'ATV01612', description: 'Atuação como instrutor em palestras técnicas, seminários, cursos da área específica, desde', truncated: true, type: 'Monitoria', ch: 40 },
  { code: 'ATV01605', description: 'Cursos de língua estrangeira - participação com aproveitamento em cursos de língua', type: 'Outras atividades', ch: 90 },
  { code: 'ATV01613', description: 'Engajamento como docente não remunerado em cursos preparatórios e de reforço escolar', type: ATIVIDADES_PENDENTES, typeTruncated: true, ch: 80 },
  { code: 'ATV01639', description: 'Especificação, desenvolvimento e manutenção de Software (sites e outros) com anuência de', truncated: true, type: 'Outras atividades', ch: 120 },
  { code: 'ATV01630', description: 'Estágio não obrigatório na área do curso', type: 'Estágios extracurriculares', ch: 100 },
  { code: 'ATV01640', description: 'Monitoria oficial', type: 'Monitoria', ch: 100 },
  { code: 'ATV01641', description: 'Monitoria voluntária', type: 'Monitoria', ch: 100 },
  { code: 'ATV01620', description: 'Participação como apresentador de trabalhos em palestras, congressos e seminários técnico-', truncated: true, type: APRESENTACAO, typeTruncated: true, ch: 20 },
  { code: 'ATV01619', description: 'Participação como apresentador de trabalhos em palestras, congressos e seminários técnico-', truncated: true, type: APRESENTACAO, typeTruncated: true, ch: 30 },
  { code: 'ATV01618', description: 'Participação como apresentador de trabalhos em palestras, congressos e seminários técnico-', truncated: true, type: APRESENTACAO, typeTruncated: true, ch: 40 },
  { code: 'ATV01608', description: 'Participação como expositor em exposição artística ou cultural', type: 'Participação em eventos', ch: 30 },
  { code: 'ATV01622', description: 'Participação como expositor em exposições técnico-científicas', type: 'Participação em eventos', ch: 20 },
  { code: 'ATV01634', description: 'Participação e aprovação em disciplinas/unidades curriculares que não integralizem carga', truncated: true, type: 'Outras atividades', ch: 120 },
  { code: 'ATV01609', description: 'Participação efetiva em Diretórios e Centros Acadêmicos, Entidades de Classe, Conselhos e', truncated: true, type: 'Outras atividades', ch: 24 },
  { code: 'ATV01610', description: 'Participação efetiva em trabalho voluntário, atividades comunitárias, CIPAS, associações de', truncated: true, type: 'Outras atividades', ch: 30 },
  { code: 'ATV01623', description: 'Participação efetiva na organização de exposições e seminários de caráter acadêmico', type: 'Participação em eventos', ch: 30 },
  { code: 'ATV01607', description: 'Participação efetiva na organização de exposições e seminários de caráter artístico ou cultural', type: 'Organização de Eventos', ch: 30 },
  { code: 'ATV01606', description: 'Participação em atividades artísticas e culturais, tais como: banda marcial, camerata de', truncated: true, type: 'Produção técnica, artística e teórica', ch: null },
  { code: 'ATV01611', description: 'Participação em atividades beneficentes', type: 'Outras atividades', ch: 30 },
  { code: 'ATV01616', description: 'Participação em cursos - Não presencial', type: 'Cursos extracurriculares', ch: 60 },
  { code: 'ATV01615', description: 'Participação em cursos - Presencial', type: 'Cursos extracurriculares', ch: 60 },
  { code: 'ATV01635', description: 'Participação em Empresa Júnior, Hotel Tecnológico, Incubadora Tecnológica', type: 'Outras atividades', ch: 120 },
  { code: 'ATV01617', description: 'Participação em palestras, congressos e seminários técnico-científicos', type: 'Participação em eventos', ch: 80 },
  { code: 'ATV01614', description: 'Participação em projetos de extensão, não remunerados, e de interesse social', type: ATIVIDADES_PENDENTES, typeTruncated: true, ch: 80 },
  { code: 'ATV01621', description: 'Participação em projetos de iniciação científica e tecnológica (CNPQ, PIBIC, PIVIC, FAPES e', truncated: true, type: 'De iniciação científica e de pesquisa', ch: 100 },
  { code: 'ATV01636', description: 'Participação em projetos multidisciplinares ou interdisciplinares - Projeto de ensino (inclusive', truncated: true, type: 'Outras atividades', ch: 120 },
  { code: 'ATV01637', description: 'Participação em projetos multidisciplinares ou interdisciplinares - Projeto de pesquisa', type: 'Outras atividades', ch: 120 },
  { code: 'ATV01633', description: 'Participação em visitas técnicas organizadas pela UFES', type: 'Visitas Técnicas Monitoradas', ch: 60 },
  { code: 'ATV01629', description: 'Publicações em anais de eventos técnico-científicos - Resumo', type: 'Publicação de trabalhos - Resumo', ch: 140 },
  { code: 'ATV01628', description: 'Publicações em anais de eventos técnico-científicos - Resumo expandido', type: 'Publicação de trabalhos - Resumo', ch: 140 },
  { code: 'ATV01627', description: 'Publicações em anais de eventos técnico-científicos - Trabalho completo', type: 'Publicação de Trabalhos - Integra', ch: 140 },
  { code: 'ATV01624', description: 'Publicações em revistas técnicas (periódicos) - A', type: 'Publicação de Trabalhos - Integra', ch: 100 },
  { code: 'ATV01625', description: 'Publicações em revistas técnicas (periódicos) - B', type: 'Publicação de Trabalhos - Integra', ch: 80 },
  { code: 'ATV01626', description: 'Publicações em revistas técnicas (periódicos) - Periódico não classificado ou C', type: 'Publicação de Trabalhos - Integra', ch: 120 },
  { code: 'ATV01631', description: 'Trabalho com vínculo empregatício, desde que na área do curso', type: 'Outras atividades', ch: 100 },
  { code: 'ATV01632', description: 'Trabalho como empreendedor na área do curso', type: 'Outras atividades', ch: 100 },
]

export const MAX_CH = Math.max(...complementares.map((a) => a.ch ?? 0))
