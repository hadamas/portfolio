import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ThemeToggle from './ThemeToggle'
import { ThemeProvider } from '../../../../context/ThemeContext'

function renderWithProvider(ui) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('ThemeToggle', () => {
  it('inicia no modo claro por padrão', () => {
    renderWithProvider(<ThemeToggle />)
    expect(screen.getByLabelText('Ativar modo escuro')).toBeInTheDocument()
  })

  it('alterna para modo escuro ao clicar', async () => {
    const user = userEvent.setup()
    renderWithProvider(<ThemeToggle />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByLabelText('Ativar modo claro')).toBeInTheDocument()
  })
})