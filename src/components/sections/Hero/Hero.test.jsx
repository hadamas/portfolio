import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'
import { LanguageProvider } from '../../../context/LanguageProvider'

function renderWithProvider(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('Hero', () => {
  it('renderiza título e subtítulo em inglês por padrão', () => {
    renderWithProvider(<Hero />)
    expect(screen.getByText("Hi! I'm Alanis")).toBeInTheDocument()
    expect(
      screen.getByText("I'm a Software developer and aspiring animator")
    ).toBeInTheDocument()
  })

  it('remove o texto ao clicar no botão de apagar', async () => {
    const user = userEvent.setup()
    renderWithProvider(<Hero />)
    await user.click(screen.getByText('Delete'))
    expect(screen.queryByText("Hi! I'm Alanis")).not.toBeInTheDocument()
  })
})