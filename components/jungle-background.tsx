"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, Cloud, Stars } from "@react-three/drei"
import type * as THREE from "three"

function JungleTrees({ position, scale, rotation }) {
  const treeRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (treeRef.current) {
      // Gentle swaying motion
      treeRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.02
    }
  })

  return (
    <group ref={treeRef} position={position} scale={scale} rotation={rotation}>
      {/* Trunk */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>

      {/* Foliage */}
      <mesh position={[0, 3, 0]} castShadow>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
      </mesh>

      {/* Roots */}
      <mesh position={[0.5, -1.8, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.1, 0.2, 1, 5]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>

      <mesh position={[-0.5, -1.8, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.1, 0.2, 1, 5]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
    </group>
  )
}

function JungleRock({ position, scale, rotation }) {
  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#616161" roughness={0.9} />
    </mesh>
  )
}

export default function JungleBackground({ scrollY = 0 }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Subtle movement based on scroll position
      groupRef.current.position.y = scrollY * -0.001
    }
  })

  return (
    <>
      <color attach="background" args={["#0A1208"]} />
      <fog attach="fog" args={["#0A1208", 5, 30]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[1, 8, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <group ref={groupRef}>
        {/* Jungle Trees */}
        <JungleTrees position={[-5, -2, -5]} scale={1} rotation={[0, 0, 0]} />
        <JungleTrees position={[5, -2, -7]} scale={1.2} rotation={[0, Math.PI / 3, 0]} />
        <JungleTrees position={[8, -2, -3]} scale={0.8} rotation={[0, Math.PI / 5, 0]} />
        <JungleTrees position={[-8, -2, -4]} scale={1.3} rotation={[0, -Math.PI / 4, 0]} />
        <JungleTrees position={[0, -2, -10]} scale={1.5} rotation={[0, Math.PI / 2, 0]} />
        <JungleTrees position={[-10, -2, -8]} scale={1.1} rotation={[0, -Math.PI / 6, 0]} />

        {/* Rocks */}
        <JungleRock position={[-3, -1.5, -2]} scale={[0.8, 0.6, 0.8]} rotation={[0.2, 0.5, 0.1]} />
        <JungleRock position={[4, -1.7, -3]} scale={[0.6, 0.5, 0.6]} rotation={[0.1, -0.3, 0.2]} />

        {/* Water pool */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, -6]} receiveShadow>
          <circleGeometry args={[3, 32]} />
          <meshStandardMaterial color="#1A237E" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#1A2614" roughness={1} />
        </mesh>
      </group>

      {/* Atmosphere */}
      <Cloud position={[0, 4, -10]} speed={0.2} opacity={0.5} width={20} depth={1.5} />
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
      <Environment preset="forest" />
    </>
  )
}
