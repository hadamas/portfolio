import Header from './components/layout/Header/Header'
import Noise from './components/layout/Noise/Noise'
import SmoothCursor from './components/layout/SmoothCursor/SmoothCursor'
import Footer from './components/layout/Footer/Footer'
import SectionStack from './components/layout/SectionStack/SectionStack'
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
            <Noise />
            <SmoothCursor />
            <div className={styles.appLayout}>
              <Header />
                <main className={styles.main}>
                  <SectionStack />
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