import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'
import { SoundProvider } from '../../../context/SoundContext'
import { ThemeProvider } from '../../../context/ThemeContext'

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <SoundProvider>{ui}</SoundProvider>
    </ThemeProvider>
  )
}

describe('Header', () => {
  it('renderiza o logo', () => {
    renderWithProviders(<Header />)
    expect(screen.getByAltText('alanis-logo')).toBeInTheDocument()
  })

  it('renderiza todos os links de navegação', () => {
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