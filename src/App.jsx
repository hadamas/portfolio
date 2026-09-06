import Header from './components/layout/Header/Header'
import { SoundProvider } from './context/SoundContext'
//import './styles/global.css'

function App() {
  return (
    <SoundProvider>
      <Header />
    </SoundProvider>
  )
}

export default App