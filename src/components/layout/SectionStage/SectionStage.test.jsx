import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SectionStage from './SectionStage'
import { ThemeProvider } from '../../../context/ThemeProvider'
import { LanguageProvider } from '../../../context/LanguageProvider'
import { SoundProvider } from '../../../context/SoundProvider'
import { NavigationProvider } from '../../../context/NavigationProvider'
import { useNavigationContext } from '../../../hooks/useNavigationContext'

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <NavigationProvider>{ui}</NavigationProvider>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

function TestNavButton({ target }) {
  const { goToSection } = useNavigationContext()
  return <button onClick={() => goToSection(target)}>go-{target}</button>
}

describe('SectionStage', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renderiza a seção Home por padrão', () => {
    renderWithProviders(<SectionStage />)
    act(() => vi.runAllTimers())
    expect(screen.getByText("Hi! I'm Alanis")).toBeInTheDocument()
  })

  it('troca para a seção clicada, sem transição', () => {
    renderWithProviders(
      <>
        <TestNavButton target="about" />
        <SectionStage />
      </>
    )
    act(() => vi.runAllTimers())

    fireEvent.click(screen.getByText('go-about'))
    expect(screen.getByText('Alanis Hadama')).toBeInTheDocument()
  })
})