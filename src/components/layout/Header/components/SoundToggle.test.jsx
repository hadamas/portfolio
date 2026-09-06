import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import SoundToggle from './SoundToggle'
import { SoundProvider } from '../../../../context/SoundContext'

function renderWithProvider(ui) {
  return render(<SoundProvider>{ui}</SoundProvider>)
}

describe('SoundToggle', () => {
  it('inicia habilitado por padrão', () => {
    renderWithProvider(<SoundToggle />)
    expect(screen.getByLabelText('Desativar som')).toBeInTheDocument()
  })

  it('alterna o estado ao clicar', async () => {
    const user = userEvent.setup()
    renderWithProvider(<SoundToggle />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByLabelText('Ativar som')).toBeInTheDocument()
  })
})