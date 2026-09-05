import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LanguageSelector from './LanguageSelector'

describe('LanguageSelector', () => {
  it('não mostra o dropdown inicialmente', () => {
    render(<LanguageSelector />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('abre o dropdown ao clicar no ícone', () => {
    render(<LanguageSelector />)
    fireEvent.click(screen.getByLabelText('Selecionar idioma'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('mostra as opções traduzidas no idioma selecionado (inglês por padrão)', () => {
    render(<LanguageSelector />)
    fireEvent.click(screen.getByLabelText('Selecionar idioma'))
    ;['English', 'Portuguese', 'French', 'Japanese'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('atualiza os nomes exibidos após trocar o idioma selecionado', () => {
    render(<LanguageSelector />)
    fireEvent.click(screen.getByLabelText('Selecionar idioma'))
    fireEvent.click(screen.getByText('Portuguese'))

    fireEvent.click(screen.getByLabelText('Selecionar idioma'))
    expect(screen.getByText('Inglês')).toBeInTheDocument()
    expect(screen.getByText('Português')).toBeInTheDocument()
  })
})