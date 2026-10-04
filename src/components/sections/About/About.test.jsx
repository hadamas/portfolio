import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import About from './About'
import { LanguageProvider } from '../../../context/LanguageProvider'

function renderWithProvider(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('About', () => {
  it('renderiza nome e profissão', () => {
    renderWithProvider(<About />)
    expect(screen.getByText('Alanis Hadama')).toBeInTheDocument()
    expect(screen.getByText('Software Developer')).toBeInTheDocument()
  })

  it('mostra o label traduzido da categoria de linguagens no Stack', () => {
    renderWithProvider(<About />)
    // em inglês "Languages" aparece 2x (coluna de idiomas + categoria do stack)
    expect(screen.getAllByText('Languages').length).toBeGreaterThanOrEqual(2)
  })

  it('renderiza as 4 categorias da stack como linhas do menu', () => {
    renderWithProvider(<About />)
    for (const label of ['Front-end', 'Back-end', 'Cloud & DevOps']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    }
  })

  it('alterna o estado ativo da linha ao clicar', async () => {
    const user = userEvent.setup()
    renderWithProvider(<About />)
    const row = screen.getByRole('button', { name: 'Front-end' })
    expect(row).toHaveAttribute('aria-pressed', 'false')
    await user.click(row)
    expect(row).toHaveAttribute('aria-pressed', 'true')
    await user.click(row)
    expect(row).toHaveAttribute('aria-pressed', 'false')
  })

  it('mostra os ícones das ferramentas na faixa, com fallback pra as sem ícone (ex: REST APIs)', () => {
    renderWithProvider(<About />)
    expect(screen.getAllByAltText('React').length).toBeGreaterThan(0)
    expect(screen.getAllByTitle('REST APIs').length).toBeGreaterThan(0)
  })
})
