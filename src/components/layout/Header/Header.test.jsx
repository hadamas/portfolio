import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renderiza o logo', () => {
    render(<Header />)
    expect(screen.getByAltText('alanis-logo')).toBeInTheDocument()
  })

  it('renderiza todos os links de navegação', () => {
    render(<Header />)
    ;['Home', 'About', 'Projects', 'Contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renderiza os 3 controles de ação', () => {
    render(<Header />)
    expect(screen.getByLabelText(/desativar som|ativar som/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/selecionar idioma/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ativar modo/i)).toBeInTheDocument()
  })
})