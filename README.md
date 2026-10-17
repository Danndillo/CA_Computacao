# Site do CA de Ciência da Computação · UFES Alegre

React 18 + TypeScript + Tailwind CSS 3, empacotado com Vite em um único `index.html`.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # gera dist/index.html (tudo embutido, pronto para hospedar)
```

## Onde editar o conteúdo

Tudo fica em `src/content/`. Enquanto uma lista estiver vazia, o site mostra modelos marcados como "Demonstração" (ou campos `[Inserir ...]`). Ao cadastrar o primeiro item real, os modelos somem sozinhos.

| Arquivo | O que controla |
| --- | --- |
| `site.ts` | e-mail, Instagram, localização, horário de atendimento |
| `about.ts` | textos da página Sobre (história, missão etc.) |
| `members.ts` | integrantes da gestão |
| `news.ts` | notícias e comunicados (`urgent: true` dá destaque) |
| `events.ts` | eventos (`status: 'proximos' | 'anteriores'`) |
| `projects.ts` | projetos e iniciativas |
| `documents.ts` | documentos (sem modelos de propósito: só entra arquivo real) |
| `complementares.ts` | atividades complementares, transcritas do PDF da UFES (04/03/2020) |

## Pendências conhecidas

- **Logotipo:** a coruja em `src/components/Logo.tsx` é uma marca provisória, porque o arquivo oficial não foi enviado. Troque o conteúdo de `<OwlMark />` pelo SVG ou imagem oficial.
- **Formulário de contato:** valida os campos, mas só envia de verdade se existir um endpoint. Defina `VITE_CONTACT_ENDPOINT` (ex.: Formspree) no build. Sem isso, a página avisa que nada foi enviado e oferece copiar a mensagem.
- **CMS / área administrativa:** não existe. `src/services/content.ts` é o ponto de troca: substitua pelas chamadas ao CMS ou banco escolhido (Supabase, Sanity, Strapi...). Edição online precisa da autenticação e das permissões desse serviço.
- **Atividades complementares:** o relatório é de 2020 e corta alguns enunciados no fim da linha (marcados com "…"). Confirme texto e valores com o Colegiado.
- **Rotas:** usam hash (`#sobre`, `#noticia-<id>`). Para URLs limpas, troque `src/lib/route.ts` por React Router.
