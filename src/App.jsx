import Header from './components/layout/Header/Header'
import { SoundProvider } from './context/SoundProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { LanguageProvider } from './context/LanguageProvider'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <Header />
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App