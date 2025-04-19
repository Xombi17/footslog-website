"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface LeafProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
}

function Leaf({ position, rotation, scale, speed }: LeafProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * speed) * 0.002
      meshRef.current.rotation.x += 0.001 * speed
      meshRef.current.rotation.y += 0.002 * speed

      // Reset position if leaf goes too low
      if (meshRef.current.position.y < -5) {
        meshRef.current.position.y = 10
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
      <tetrahedronGeometry args={[scale, 0]} />
      <meshStandardMaterial color="#4A6D33" roughness={0.8} metalness={0.1} />
    </mesh>
  )
}

export default function FloatingLeaves({ count = 10 }) {
  const leaves = Array.from({ length: count }, (_, i) => ({
    position: [(Math.random() - 0.5) * 20, Math.random() * 10, (Math.random() - 0.5) * 10] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
    scale: 0.1 + Math.random() * 0.2,
    speed: 0.5 + Math.random() * 1.5,
    key: i,
  }))

  return (
    <group>
      {leaves.map((leaf) => (
        <Leaf key={leaf.key} {...leaf} />
      ))}
    </group>
  )
}
