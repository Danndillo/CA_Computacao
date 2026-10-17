/**
 * Textos institucionais editáveis da página "Sobre".
 * `text: null` aparece como campo de preenchimento. Nada aqui é história ou missão inventada.
 */
export const aboutIntro =
  'O Centro Acadêmico é a entidade que representa os estudantes do curso junto à coordenação, ao colegiado e à universidade. Esta página reúne, nas palavras da própria gestão, quem somos e o que fazemos.'

export const aboutSections: { id: string; title: string; prompt: string; text: string[] | null }[] = [
  { id: 'historia', title: 'Nossa história', prompt: '[Inserir a história do Centro Acadêmico]', text: null },
  { id: 'missao', title: 'Missão e objetivos', prompt: '[Inserir missão e objetivos]', text: null },
  { id: 'representacao', title: 'Atuação na representação discente', prompt: '[Descrever como o CA representa os estudantes]', text: null },
  { id: 'importancia', title: 'Importância para a comunidade acadêmica', prompt: '[Inserir texto institucional]', text: null },
  { id: 'integracao', title: 'Iniciativas de integração', prompt: '[Listar iniciativas voltadas à integração dos estudantes]', text: null },
]
