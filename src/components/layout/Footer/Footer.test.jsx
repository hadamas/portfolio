import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'
import { ThemeProvider } from '../../../context/ThemeProvider'
import { LanguageProvider } from '../../../context/LanguageProvider'

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeProvider>
  )
}

describe('Footer', () => {
  it('renderiza o logo', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByAltText('alanis-logo')).toBeInTheDocument()
  })

  it('renderiza o texto de copyright com o ano atual', () => {
    renderWithProviders(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
  })
})