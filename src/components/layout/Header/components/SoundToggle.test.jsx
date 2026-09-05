import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SoundToggle from './SoundToggle'

describe('SoundToggle', () => {
  it('inicia habilitado por padrão', () => {
    render(<SoundToggle />)
    expect(screen.getByLabelText('Desativar som')).toBeInTheDocument()
  })

  it('alterna o estado ao clicar', () => {
    render(<SoundToggle />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByLabelText('Ativar som')).toBeInTheDocument()
  })
})