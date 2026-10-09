import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import NavMenu from './NavMenu'
import { SoundProvider } from '../../../context/SoundProvider'
import { ThemeProvider } from '../../../context/ThemeProvider'
import { LanguageProvider } from '../../../context/LanguageProvider'
import { NavigationProvider } from '../../../context/NavigationProvider'
import { useNavigationContext } from '../../../hooks/useNavigationContext'

function OpenButton() {
  const { toggleMenu, isMenuOpen, activeSection } = useNavigationContext()
  return (
    <>
      <button type="button" onClick={toggleMenu}>toggle</button>
      <span data-testid="state">{`${isMenuOpen}:${activeSection}`}</span>
    </>
  )
}

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

describe('NavMenu', () => {
  it('renderiza os 4 links de seção', () => {
    renderWithProviders(<NavMenu />)
    for (const label of ['Home', 'About', 'Projects', 'Contact']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('vai para a seção e fecha o menu ao clicar num link', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <OpenButton />
        <NavMenu />
      </>
    )
    await user.click(screen.getByText('toggle'))
    expect(screen.getByTestId('state')).toHaveTextContent('true:home')
    await user.click(screen.getByText('Projects'))
    expect(screen.getByTestId('state')).toHaveTextContent('false:projects')
  })
})
