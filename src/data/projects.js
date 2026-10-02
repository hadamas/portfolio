// Dados estruturais dos projetos -- sem texto visível aqui. Os textos
// (categoria, título, descrição) ficam em `i18n/translations.js`, dentro de
// `projects.items`, usando o mesmo `id` que está aqui embaixo.
//
// `media: null` faz o card mostrar um placeholder. Pra colocar a arte real
// de um projeto, troque por:
//   media: { type: 'image', src: suaImagem }   (import no topo do arquivo)
//   media: { type: 'video', src: seuVideo }    (toca em loop, mudo, sem controles)
// `link: null` esconde o ícone de link no card. Troque por uma URL quando
// tiver onde apontar (site, repositório, etc).
export const PROJECTS = [
  { id: 'project-01', link: null, media: null },
  { id: 'project-02', link: null, media: null },
  { id: 'project-03', link: null, media: null },
  { id: 'project-04', link: null, media: null },
]
