import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import SectionStage from './components/layout/SectionStage/SectionStage'
import { SoundProvider } from './context/SoundProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { LanguageProvider } from './context/LanguageProvider'
import { NavigationProvider } from './context/NavigationProvider'
import styles from './App.module.css'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <NavigationProvider>
            <div className={styles.backgroundLayer} />
            <div className={styles.appLayout}>
              <Header />
                <main className={styles.main}>
                  <SectionStage />
                </main>
              <Footer />
            </div>
          </NavigationProvider>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App