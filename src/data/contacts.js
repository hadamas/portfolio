export const EMAIL = 'alanis.hadama@gmail.com'

const LINKEDIN_URL = 'https://www.linkedin.com/in/alanis-hadama/'
const LINKEDIN_LOCALES = { en: 'en-US', fr: 'fr-FR', ja: 'ja-JP' }

const linkedinHref = (code) => {
  const locale = LINKEDIN_LOCALES[code]
  return locale ? `${LINKEDIN_URL}?locale=${locale}` : LINKEDIN_URL
}

export const SOCIALS = [
  { id: 'linkedin', name: 'linkedin', href: linkedinHref },
  { id: 'github', name: 'github', href: "https://github.com/hadamas" },
  // { id: 'tiktok', name: 'tiktok', href: "https://www.tiktok.com/@guidebyhadi" },
  { id: 'codepen', name: 'codepen', href: "https://codepen.io/hadamas" },
]
