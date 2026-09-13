import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Hero from './Hero'
import { LanguageProvider } from '../../../context/LanguageProvider'

function renderWithProviders(ui) {
  return render(
    <LanguageProvider>{ui}</LanguageProvider>
  )
}

describe('Hero', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('termina digitando o título e o subtítulo por completo', () => {
    renderWithProviders(<Hero />)

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByText("Hi! I'm Alanis")).toBeInTheDocument()
    expect(
      screen.getByText("I'm a Software developer and aspiring animator")
    ).toBeInTheDocument()
  })

  it('remove o texto ao clicar no botão de apagar', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    renderWithProviders(<Hero />)
    await user.click(screen.getByText('Delete'))
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })
})