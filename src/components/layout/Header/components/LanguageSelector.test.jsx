import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import LanguageSelector from './LanguageSelector'
import { LanguageProvider } from '../../../../context/LanguageContext'

function renderWithProvider(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('LanguageSelector', () => {
  it('não mostra o dropdown inicialmente', () => {
    renderWithProvider(<LanguageSelector />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('abre o dropdown ao clicar no ícone', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LanguageSelector />)
    await user.click(screen.getByLabelText('Selecionar idioma'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('mostra as opções traduzidas no idioma selecionado (inglês por padrão)', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LanguageSelector />)
    await user.click(screen.getByLabelText('Selecionar idioma'))

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4)
    expect(options[0]).toHaveTextContent('English')
    expect(options[1]).toHaveTextContent('Portuguese')
  })

  it('atualiza os nomes exibidos após trocar o idioma selecionado', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LanguageSelector />)

    await user.click(screen.getByLabelText('Selecionar idioma'))
    await user.click(screen.getByRole('option', { name: /Portuguese/ }))

    await user.click(screen.getByLabelText('Selecionar idioma'))
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveTextContent('Inglês')
    expect(options[1]).toHaveTextContent('Português')
  })
})