import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResumeButton from './ResumeButton'
import { LanguageProvider } from '../../../../context/LanguageProvider'

function renderWithProvider(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('ResumeButton', () => {
  it('aponta para o PDF em inglês por padrão', () => {
    renderWithProvider(<ResumeButton />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/alanishadama-eng.pdf')
  })
})