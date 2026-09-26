import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SectionStack from './SectionStack'
import { ThemeProvider } from '../../../context/ThemeProvider'
import { LanguageProvider } from '../../../context/LanguageProvider'
import { SoundProvider } from '../../../context/SoundProvider'

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>{ui}</SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

describe('SectionStack', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renderiza todas as seções empilhadas', () => {
    renderWithProviders(<SectionStack />)
    act(() => vi.runAllTimers())

    expect(screen.getByText("Hi! I'm Alanis")).toBeInTheDocument()
    expect(screen.getByText('Alanis Hadama')).toBeInTheDocument() // do About
  })
})