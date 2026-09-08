import Header from './components/layout/Header/Header'
import { SoundProvider } from './context/SoundContext'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
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