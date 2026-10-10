import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Hero from './Hero'
import { parseOutlineMarkup } from '../../../utils/outlineMarkup'
import { translations } from '../../../i18n/translations'
import { LanguageProvider } from '../../../context/LanguageProvider'
import { NavigationProvider } from '../../../context/NavigationProvider'

function renderWithProviders(ui) {
  return render(
    <LanguageProvider>
      <NavigationProvider>{ui}</NavigationProvider>
    </LanguageProvider>
  )
}

describe('Hero', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('termina digitando o título e o subtítulo por completo', () => {
    renderWithProviders(<Hero />)

    act(() => {
      vi.runAllTimers()
    })

    const flat = (text) => text.replace(/\s+/g, ' ').trim()
    const { plain } = parseOutlineMarkup(translations.en.hero.title)
    expect(screen.getByRole('heading', { level: 1, name: (name) => flat(name) === flat(plain) })).toBeInTheDocument()
    expect(
      screen.getByText(translations.en.hero.subtitle)
    ).toBeInTheDocument()
  })

  it('remove o texto ao clicar no botão de apagar', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    renderWithProviders(<Hero />)
    await user.click(screen.getByText('Delete'))
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })

  it('mostra os links para Projects e About e navega ao clicar', () => {
    renderWithProviders(<Hero />)
    act(() => {
      vi.runAllTimers()
    })

    const projects = screen.getByRole('link', { name: translations.en.hero.projectsLink })
    expect(projects).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: translations.en.hero.aboutLink })).toHaveAttribute('href', '#about')

    act(() => {
      projects.click()
    })
    expect(window.location.hash).toBe('#projects')
  })
})
