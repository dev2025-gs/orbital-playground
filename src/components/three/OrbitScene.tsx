import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Trail, Line } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#1a3d5c"
        emissive="#0a2540"
        emissiveIntensity={0.3}
        roughness={0.8}
      />
    </Sphere>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[1.03, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#ff8c00"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

interface SatelliteProps {
  orbitRadius: number;
  eccentricity: number;
  speed: number;
}

function Satellite({ orbitRadius, eccentricity, speed }: SatelliteProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      angleRef.current += delta * speed;
      const a = orbitRadius;
      const b = orbitRadius * Math.sqrt(1 - eccentricity * eccentricity);
      const x = a * Math.cos(angleRef.current);
      const z = b * Math.sin(angleRef.current);
      meshRef.current.position.set(x, 0, z);
    }
  });

  return (
    <Trail
      width={0.4}
      length={10}
      color={new THREE.Color("#ff8c00")}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[0.08, 0.08, 0.15]} />
        <meshStandardMaterial
          color="#ff8c00"
          emissive="#ff8c00"
          emissiveIntensity={2}
        />
      </mesh>
    </Trail>
  );
}

interface OrbitPathProps {
  radius: number;
  eccentricity: number;
}

function OrbitPath({ radius, eccentricity }: OrbitPathProps) {
  const points: THREE.Vector3[] = [];
  const a = radius;
  const b = radius * Math.sqrt(1 - eccentricity * eccentricity);

  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const x = a * Math.cos(angle);
    const z = b * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  return (
    <Line
      points={points}
      color="#ff8c00"
      lineWidth={1.5}
      transparent
      opacity={0.5}
      dashed
      dashSize={0.1}
      gapSize={0.05}
    />
  );
}

// Grid lines for tactical display
function TacticalGrid() {
  const gridLines: THREE.Vector3[][] = [];
  
  // Circular grid rings
  for (let r = 2; r <= 6; r += 2) {
    const ring: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ring.push(new THREE.Vector3(r * Math.cos(angle), 0, r * Math.sin(angle)));
    }
    gridLines.push(ring);
  }

  return (
    <group>
      {gridLines.map((ring, idx) => (
        <Line
          key={idx}
          points={ring}
          color="#1a3d5c"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

interface OrbitSceneProps {
  orbitRadius?: number;
  eccentricity?: number;
  speed?: number;
}

export function OrbitScene({
  orbitRadius = 3,
  eccentricity = 0.3,
  speed = 0.5,
}: OrbitSceneProps) {
  return (
    <Canvas camera={{ position: [0, 6, 8], fov: 55 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff8c00" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#1a5fb4" />
      
      <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />
      
      <TacticalGrid />
      <Earth />
      <Atmosphere />
      <OrbitPath radius={orbitRadius} eccentricity={eccentricity} />
      <Satellite orbitRadius={orbitRadius} eccentricity={eccentricity} speed={speed} />
      
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
