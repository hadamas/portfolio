import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'
import { SoundProvider } from '../../../context/SoundProvider'
import { ThemeProvider } from '../../../context/ThemeProvider'
import { LanguageProvider } from '../../../context/LanguageProvider'

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>{ui}</SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

describe('Header', () => {
  it('renderiza o logo', () => {
    renderWithProviders(<Header />)
    expect(screen.getByAltText('alanis-logo')).toBeInTheDocument()
  })

  it('renderiza os links de navegação em inglês por padrão', () => {
    renderWithProviders(<Header />)
    ;['Home', 'About', 'Projects', 'Contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renderiza os 3 controles de ação', () => {
    renderWithProviders(<Header />)
    expect(screen.getByLabelText(/desativar som|ativar som/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/selecionar idioma/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ativar modo/i)).toBeInTheDocument()
  })
})