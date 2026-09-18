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

  it('alterna a classe ativa ao clicar no ícone da ferramenta', async () => {
    const user = userEvent.setup()
    renderWithProvider(<About />)
    const reactButton = screen.getByAltText('React').closest('button')
    await user.click(reactButton)
    expect(reactButton.className).toMatch(/toolItemActive/)
  })

  it('mostra placeholder e nome para ferramentas sem ícone (ex: REST APIs)', () => {
    renderWithProvider(<About />)
    expect(screen.getByText('REST APIs')).toBeInTheDocument()
  })
})