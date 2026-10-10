// Marks parts of a text that should be rendered as outline: "Hi, I'm [[Alanis]]".
// Returns the list of segments and the plain text (markers removed).
export function parseOutlineMarkup(raw) {
  const segments = raw
    .split(/(\[\[.*?\]\])/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('[[')
        ? { text: part.slice(2, -2), outline: true }
        : { text: part, outline: false },
    )
  return { segments, plain: segments.map((s) => s.text).join('') }
}
