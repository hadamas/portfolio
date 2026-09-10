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

  it('renderiza os links de navegação (desktop + mobile)', () => {
    renderWithProviders(<Header />)
    expect(screen.getAllByText('Home')).toHaveLength(2)
    expect(screen.getAllByText('About')).toHaveLength(2)
    expect(screen.getAllByText('Projects')).toHaveLength(2)
    expect(screen.getAllByText('Contact')).toHaveLength(2)
  })

  it('renderiza os controles de ação (desktop + mobile)', () => {
    renderWithProviders(<Header />)
    expect(screen.getAllByLabelText(/desativar som|ativar som/i)).toHaveLength(2)
    expect(screen.getAllByLabelText(/selecionar idioma/i)).toHaveLength(2)
    expect(screen.getAllByLabelText(/ativar modo/i)).toHaveLength(2)
  })
})