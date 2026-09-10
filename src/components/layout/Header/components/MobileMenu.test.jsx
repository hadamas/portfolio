import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import MobileMenu from './MobileMenu'
import { SoundProvider } from '../../../../context/SoundProvider'
import { ThemeProvider } from '../../../../context/ThemeProvider'
import { LanguageProvider } from '../../../../context/LanguageProvider'

const navItems = [{ href: '#home', key: 'home' }]
const nav = { home: 'Home' }

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>{ui}</SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

describe('MobileMenu', () => {
  it('renderiza os links e o botão de currículo', () => {
    renderWithProviders(<MobileMenu navItems={navItems} nav={nav} isOpen={true} onClose={() => {}} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('chama onClose ao clicar num link', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderWithProviders(<MobileMenu navItems={navItems} nav={nav} isOpen={true} onClose={onClose} />)
    await user.click(screen.getByText('Home'))
    expect(onClose).toHaveBeenCalledOnce()
  })
})