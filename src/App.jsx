import Header from './components/layout/Header/Header'
import SiteBackground from './components/layout/CausticsBackground/SiteBackground'
import SmoothCursor from './components/layout/SmoothCursor/SmoothCursor'
import Footer from './components/layout/Footer/Footer'
import SectionStack from './components/layout/SectionStack/SectionStack'
import NavMenu from './components/layout/NavMenu/NavMenu'
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
            <SmoothCursor />
            <div className={styles.shell}>
              <div className={styles.frame}>
                <SiteBackground />
                <Header />
                <main className={styles.main}>
                  <SectionStack />
                </main>
                <NavMenu />
              </div>
              <Footer />
            </div>
          </NavigationProvider>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
