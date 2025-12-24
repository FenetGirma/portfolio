"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

function Step1Scene() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (outerRef.current) {
      outerRef.current.rotation.y = time * 0.3
      outerRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.4
      innerRef.current.scale.setScalar(0.8 + Math.sin(time * 2 + 1) * 0.1)
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.2
    }
  })

  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const radius = 2 + Math.random() * 1
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }

  return (
    <group>
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#1f2937" wireframe />
      </mesh>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#374151" wireframe />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#6b7280" />
      </points>
    </group>
  )
}

function Step2Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const brush1Ref = useRef<THREE.Mesh>(null)
  const brush2Ref = useRef<THREE.Mesh>(null)
  const brush3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3
    }

    if (brush1Ref.current) {
      brush1Ref.current.position.y = Math.sin(time * 2) * 0.5
      brush1Ref.current.rotation.z = time * 0.5
    }

    if (brush2Ref.current) {
      brush2Ref.current.position.y = Math.sin(time * 2 + 2) * 0.5
      brush2Ref.current.rotation.z = -time * 0.5
    }

    if (brush3Ref.current) {
      brush3Ref.current.position.y = Math.sin(time * 2 + 4) * 0.5
      brush3Ref.current.rotation.z = time * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={brush1Ref} position={[-0.8, 0, 0]}>
        <torusGeometry args={[0.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={brush2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.1, 16, 100]} />
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh ref={brush3Ref} position={[0.8, 0, 0]}>
        <torusGeometry args={[0.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Step3Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.4
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[-0.7, 0.7, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.7, 0.7, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.7, -0.7, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.7, -0.7, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.7]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#6b7280" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh scale={2.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1f2937" wireframe />
      </mesh>
    </group>
  )
}

function Step4Scene() {
  const rocketRef = useRef<THREE.Group>(null)
  const trail1Ref = useRef<THREE.Mesh>(null)
  const trail2Ref = useRef<THREE.Mesh>(null)
  const trail3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (rocketRef.current) {
      rocketRef.current.position.y = Math.sin(time * 1.5) * 0.3
      rocketRef.current.rotation.z = Math.sin(time * 2) * 0.1
    }

    if (trail1Ref.current) {
      trail1Ref.current.position.y = Math.sin(time * 1.5 - 0.5) * 0.3 - 0.8
      trail1Ref.current.scale.setScalar(0.8 + Math.sin(time * 3) * 0.2)
    }

    if (trail2Ref.current) {
      trail2Ref.current.position.y = Math.sin(time * 1.5 - 1) * 0.3 - 1.4
      trail2Ref.current.scale.setScalar(0.6 + Math.sin(time * 3 + 1) * 0.2)
    }

    if (trail3Ref.current) {
      trail3Ref.current.position.y = Math.sin(time * 1.5 - 1.5) * 0.3 - 2
      trail3Ref.current.scale.setScalar(0.4 + Math.sin(time * 3 + 2) * 0.2)
    }
  })

  return (
    <group>
      <group ref={rocketRef}>
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.4, 0.8, 4]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 4]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      <mesh ref={trail1Ref}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#6b7280" transparent opacity={0.6} />
      </mesh>
      <mesh ref={trail2Ref}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#4b5563" transparent opacity={0.4} />
      </mesh>
      <mesh ref={trail3Ref}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#374151" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

const steps = [
  {
    number: "01",
    title: "Understand Your Needs",
    description:
      "Our first exchange is an opportunity to clarify your vision. Together, we highlight your objectives to bring out clear ideas.",
    scene: Step1Scene,
    label: "DISCOVERY",
  },
  {
    number: "02",
    title: "Imagine & Create",
    description:
      "I translate your ideas into custom visual concepts. Brand guidelines, mockups, atmosphere: everything is designed to combine aesthetics, clarity and user experience.",
    scene: Step2Scene,
    label: "CREATION",
  },
  {
    number: "03",
    title: "Bring Design to Life",
    description:
      "This is where aesthetics meet technique. Each page is optimized for all devices: computer, tablet and mobile, to ensure an intuitive and efficient experience.",
    scene: Step3Scene,
    label: "DEVELOPMENT",
  },
  {
    number: "04",
    title: "Launch & Go Live",
    description:
      "Once the site is ready, it goes online with everything needed to perform: speed, security, natural referencing, and compatibility across all devices.",
    scene: Step4Scene,
    label: "LAUNCH",
  },
]

export function HowIDoIt() {
  const [translateX, setTranslateX] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerTop = container.offsetTop
      const containerHeight = container.offsetHeight
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      const scrollStart = containerTop - windowHeight / 2
      const scrollEnd = containerTop + containerHeight - windowHeight / 2
      const scrollProgress = (scrollY - scrollStart) / (scrollEnd - scrollStart)

      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

      const rawStep = clampedProgress * (steps.length - 1)
      const currentStep = Math.round(rawStep)
      setActiveStep(Math.max(0, Math.min(steps.length - 1, currentStep)))

      const totalScrollWidth = (steps.length - 1) * 90
      setTranslateX(-clampedProgress * totalScrollWidth)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={containerRef} className="relative bg-background" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full flex flex-col justify-center px-6 lg:px-16 py-12">
          <div className="mb-16">
            {/* <h2 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight">How I Do It</h2> */}

            <div className="flex items-center gap-3 mb-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        index <= activeStep ? "bg-primary scale-125" : "bg-muted-foreground/30"
                      }`}
                    />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-[1px] w-16 lg:w-24 transition-all duration-500 ${
                        index < activeStep ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">{steps[activeStep].label}</p>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex gap-24 h-full items-center transition-transform duration-100 ease-linear"
              style={{ transform: `translateX(${translateX}vw)` }}
            >
              {steps.map((step, index) => (
                <div key={index} className="flex-shrink-0 w-screen px-6 lg:px-16">
                  <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
                    <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] rounded-2xl overflow-hidden backdrop-blur-sm ">
                      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        <step.scene />
                        <Environment preset="city" />
                        <OrbitControls enableZoom={false} enablePan={false} />
                      </Canvas>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="flex items-baseline gap-6">
                        <div className="text-7xl lg:text-8xl font-bold text-foreground/10 leading-none tabular-nums">
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-3 uppercase">
                            Step {step.number}
                          </p>
                          <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
