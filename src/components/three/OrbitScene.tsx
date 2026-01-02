import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Trail, Line } from "@react-three/drei";
import * as THREE from "three";

interface EarthProps {
  orbitRadius?: number;
  eccentricity?: number;
}

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
        color="#1a4d7c"
        emissive="#0066cc"
        emissiveIntensity={0.2}
        roughness={0.8}
      />
    </Sphere>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[1.05, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#00ccff"
        transparent
        opacity={0.15}
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
      width={0.5}
      length={8}
      color={new THREE.Color("#00fff7")}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#00fff7"
          emissive="#00fff7"
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
      color="#00fff7"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
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
    <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ccff" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <Earth />
      <Atmosphere />
      <OrbitPath radius={orbitRadius} eccentricity={eccentricity} />
      <Satellite orbitRadius={orbitRadius} eccentricity={eccentricity} speed={speed} />
      
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
