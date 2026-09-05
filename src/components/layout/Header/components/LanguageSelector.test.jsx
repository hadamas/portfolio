import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LanguageSelector from './LanguageSelector'

describe('LanguageSelector', () => {
  it('não mostra o dropdown inicialmente', () => {
    render(<LanguageSelector />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('abre o dropdown ao clicar no botão', () => {
    render(<LanguageSelector />)
    fireEvent.click(screen.getByLabelText('Selecionar idioma'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('mostra as 4 opções de idioma', () => {
    render(<LanguageSelector />)
    fireEvent.click(screen.getByLabelText('Selecionar idioma'))
    ;['English', 'Português', 'Français', '日本語'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('fecha o dropdown ao selecionar uma opção', () => {
    render(<LanguageSelector />)
    fireEvent.click(screen.getByLabelText('Selecionar idioma'))
    fireEvent.click(screen.getByText('Português'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})