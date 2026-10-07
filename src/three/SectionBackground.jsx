import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei'
import styles from './SectionBackground.module.css'

// Toca a primeira animação embutida no glb (se existir) em loop.
// `speed` é o timeScale do THREE.AnimationAction: 1 = velocidade original
// do clip exportado, 0.5 = metade, 2 = dobro, valores negativos tocam ao
// contrário.
function Model({ url, speed = 1 }) {
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    const [firstAction] = Object.values(actions)
    if (!firstAction) return undefined
    firstAction.reset().fadeIn(0.4).play()
    return () => firstAction.fadeOut(0.2)
  }, [actions])

  // Separado do efeito acima pra não reiniciar o fade-in toda vez que só
  // a velocidade mudar.
  useEffect(() => {
    const [firstAction] = Object.values(actions)
    if (firstAction) firstAction.timeScale = speed
  }, [actions, speed])

  return <primitive object={scene} />
}

// Enquanto o usuário não está arrastando, o modelo inclina sutilmente na
// direção do mouse — dá a sensação de "vivo" sem atrapalhar o giro manual.
function IdleLookAt({ targetRef, enabled }) {
  const { pointer } = useThree()

  useFrame(() => {
    const group = targetRef.current
    if (!enabled || !group) return
    const targetY = pointer.x * 0.4
    const targetX = -pointer.y * 0.25
    group.rotation.y += (targetY - group.rotation.y) * 0.04
    group.rotation.x += (targetX - group.rotation.x) * 0.04
  })

  return null
}

function Scene({
  url,
  background,
  margin,
  animationSpeed,
  ambientIntensity,
  keyLightPosition,
  keyLightIntensity,
  fillLightPosition,
  fillLightIntensity,
  environmentPreset,
}) {
  const groupRef = useRef()
  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      {background && <color attach="background" args={[background]} />}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight position={keyLightPosition} intensity={keyLightIntensity} />
      <directionalLight position={fillLightPosition} intensity={fillLightIntensity} />
      <Environment preset={environmentPreset} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={margin}>
          <Center>
            <group ref={groupRef}>
              <Model url={url} speed={animationSpeed} />
            </group>
          </Center>
        </Bounds>
      </Suspense>
      <IdleLookAt targetRef={groupRef} enabled={!isDragging} />
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2}
        maxDistance={14}
        onStart={() => setIsDragging(true)}
        onEnd={() => setIsDragging(false)}
      />
    </>
  )
}

// Protege a seção inteira: se o navegador não conseguir criar contexto
// WebGL, ou o loader falhar, cai fora silenciosamente em vez de quebrar
// a página.
class Canvas3DBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Não foi possível iniciar o fundo 3D:', error)
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

// Só monta o Canvas (e só então o glb começa a baixar) quando a seção
// realmente entra perto da viewport — evita puxar os ~80MB de modelos
// de uma vez só no carregamento inicial da página.
function useInView(ref, { rootMargin = '200px' } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView || !ref.current) return undefined
    const node = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, inView, rootMargin])

  return inView
}

// Todo valor abaixo tem o mesmo padrão que já estava hardcoded na Scene
// antes -- passe qualquer um deles como prop, por seção, pra customizar
// aquele modelo especificamente:
//   enabled                false pausa esse fundo 3D (não baixa o glb, não
//                           monta o Canvas) sem perder a config -- deixe
//                           todas as outras props como estão, prontas pra
//                           voltar quando ligar de novo
//   animationSpeed        timeScale do clip (1 = original, 0.5 = metade, 2 = dobro)
//   cameraPosition / fov  posição/lente inicial da câmera, antes do auto-fit
//   margin                folga do auto-fit do Bounds (menor = mais zoom)
//   ambientIntensity      força da luz ambiente (uniforme, sem sombra)
//   keyLightPosition/Intensity  luz principal (direção + força)
//   fillLightPosition/Intensity luz de preenchimento (direção + força)
//   environmentPreset     preset de IBL do drei: city, sunset, dawn, night,
//                          warehouse, forest, apartment, studio, park, lobby
function SectionBackground({
  url,
  background,
  enabled = true,
  animationSpeed = 0.5,
  cameraPosition = [3, 2.4, 6],
  fov = 40,
  margin = 0.3,
  ambientIntensity = 0.6,
  keyLightPosition = [4, 6, 5],
  keyLightIntensity = 1.2,
  fillLightPosition = [-4, -2, -5],
  fillLightIntensity = 0.35,
  environmentPreset = 'city',
}) {
  const wrapperRef = useRef(null)
  const inView = useInView(wrapperRef)
  const shouldLoad = enabled && inView

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {shouldLoad && (
        <Canvas3DBoundary>
          <Canvas
            camera={{ position: cameraPosition, fov }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
          >
            <Scene
              url={url}
              background={background}
              margin={margin}
              animationSpeed={animationSpeed}
              ambientIntensity={ambientIntensity}
              keyLightPosition={keyLightPosition}
              keyLightIntensity={keyLightIntensity}
              fillLightPosition={fillLightPosition}
              fillLightIntensity={fillLightIntensity}
              environmentPreset={environmentPreset}
            />
          </Canvas>
        </Canvas3DBoundary>
      )}
    </div>
  )
}

export default SectionBackground
