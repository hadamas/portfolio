import Header from './components/layout/Header/Header'
import { SoundProvider } from './context/SoundContext'
import { ThemeProvider } from './context/ThemeContext'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Header />
      </SoundProvider>
    </ThemeProvider>
  )
}

export default App