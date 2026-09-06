import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'
import { SoundProvider } from '../../../context/SoundContext'

function renderWithProvider(ui) {
  return render(<SoundProvider>{ui}</SoundProvider>)
}

describe('Header', () => {
  it('renderiza o logo', () => {
    renderWithProvider(<Header />)
    expect(screen.getByAltText('alanis-logo')).toBeInTheDocument()
  })

  it('renderiza todos os links de navegação', () => {
    renderWithProvider(<Header />)
    ;['Home', 'About', 'Projects', 'Contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renderiza os 3 controles de ação', () => {
    renderWithProvider(<Header />)
    expect(screen.getByLabelText(/desativar som|ativar som/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/selecionar idioma/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ativar modo/i)).toBeInTheDocument()
  })
})