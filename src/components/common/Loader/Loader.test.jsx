import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loader from './Loader'

describe('Loader', () => {
  it('renderiza com o label padrão', () => {
    render(<Loader />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renderiza com label customizado', () => {
    render(<Loader label="Carregando cena 3D..." />)
    expect(screen.getByText('Carregando cena 3D...')).toBeInTheDocument()
  })

  it('usa role="status" para acessibilidade', () => {
    render(<Loader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('aplica a variante global por padrão quando especificada', () => {
    const { container } = render(<Loader variant="global" />)
    expect(container.firstChild.className).toMatch(/global/)
  })

  it('aplica a variante section por padrão', () => {
    const { container } = render(<Loader />)
    expect(container.firstChild.className).toMatch(/section/)
  })
})