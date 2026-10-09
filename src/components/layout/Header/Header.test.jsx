import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Header from './Header'
import { SoundProvider } from '../../../context/SoundProvider'
import { ThemeProvider } from '../../../context/ThemeProvider'
import { LanguageProvider } from '../../../context/LanguageProvider'
import { NavigationProvider } from '../../../context/NavigationProvider'

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <NavigationProvider>{ui}</NavigationProvider>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

describe('Header', () => {
  it("renders 'Name' as a logo", () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('button', { name: 'Alanis Hadama' })).toBeInTheDocument()
  })

  it('renders control icons', () => {
    renderWithProviders(<Header />)
    expect(screen.getByLabelText(/desativar som|ativar som/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/selecionar idioma/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ativar modo/i)).toBeInTheDocument()
  })

  it('toggles between open and close menu', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    const button = screen.getByRole('button', { name: 'Abrir menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true')
  })
})
