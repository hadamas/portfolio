import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import { SoundProvider } from './context/SoundProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { LanguageProvider } from './context/LanguageProvider'
import styles from './App.module.css'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <div className={styles.appLayout}>
            <Header />
            <main className={styles.main}>
              {/* seções (Hero, About, Projects, Contact) entram aqui */}
            </main>
            <Footer />
          </div>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App