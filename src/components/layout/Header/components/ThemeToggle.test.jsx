import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('inicia no modo claro por padrão', () => {
    render(<ThemeToggle />)
    expect(screen.getByLabelText('Ativar modo escuro')).toBeInTheDocument()
  })

  it('alterna para modo escuro ao clicar', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByLabelText('Ativar modo claro')).toBeInTheDocument()
  })
})