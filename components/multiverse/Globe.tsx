"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import type { Earth } from "@/lib/data/earths";

/** Evenly distributes n points on a sphere via a golden-angle spiral. */
function spherePoints(n: number, radius: number) {
  const points: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

function HeroPin({
  position,
  name,
  location,
  color,
  interactive,
}: {
  position: [number, number, number];
  name: string;
  location: string;
  color: string;
  interactive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[interactive ? 0.045 : 0.03, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.9}
        />
      </mesh>
      {hovered && interactive && (
        <Html distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div className="pin-tooltip">
            <strong>{name}</strong>
            <span>{location}</span>
          </div>
          <style>{`
            .pin-tooltip {
              background: rgba(7, 9, 10, 0.92);
              border: 1px solid var(--copper);
              padding: 0.35rem 0.6rem;
              font-family: var(--font-mono);
              font-size: 0.65rem;
              white-space: nowrap;
              display: flex;
              flex-direction: column;
              color: var(--text-primary);
              transform: translate(10px, -10px);
            }
            .pin-tooltip strong {
              color: var(--green-glow);
              font-size: 0.7rem;
            }
          `}</style>
        </Html>
      )}
    </group>
  );
}

function EarthMesh({ earth, interactive }: { earth: Earth; interactive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const radius = 1;
  const pins = useMemo(
    () => spherePoints(earth.heroes.length, radius * 1.01),
    [earth.heroes.length]
  );

  useFrame((_, delta) => {
    if (groupRef.current && !interactive) {
      groupRef.current.rotation.y += delta * 0.18;
    } else if (groupRef.current && interactive) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, interactive ? 48 : 24, interactive ? 48 : 24]} />
        <meshStandardMaterial
          color={earth.colors.base}
          emissive={earth.colors.glow}
          emissiveIntensity={earth.faded ? 0.08 : 0.22}
          roughness={0.55}
          metalness={0.35}
          transparent={earth.faded}
          opacity={earth.faded ? 0.6 : 1}
        />
      </mesh>
      <mesh scale={1.04}>
        <sphereGeometry args={[radius, interactive ? 48 : 24, interactive ? 48 : 24]} />
        <meshBasicMaterial color={earth.colors.rim} transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      {earth.heroes.map((hero, i) => (
        <HeroPin
          key={hero.name}
          position={pins[i]}
          name={hero.name}
          location={hero.location}
          color={earth.colors.accent}
          interactive={interactive}
        />
      ))}
    </group>
  );
}

function TvaMesh({ earth, interactive }: { earth: Earth; interactive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pins = useMemo(() => spherePoints(earth.heroes.length, 0.9), [earth.heroes.length]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (interactive ? 0.05 : 0.15);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Brutalist floating structure: stacked offset slabs instead of a sphere */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.4, 0.3, 1.1]} />
        <meshStandardMaterial color={earth.colors.base} emissive={earth.colors.glow} emissiveIntensity={0.2} metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0.15, -0.1, 0.05]}>
        <boxGeometry args={[1.0, 0.35, 1.3]} />
        <meshStandardMaterial color={earth.colors.base} emissive={earth.colors.glow} emissiveIntensity={0.25} metalness={0.4} roughness={0.55} />
      </mesh>
      <mesh position={[-0.2, -0.45, -0.1]}>
        <boxGeometry args={[0.8, 0.25, 0.7]} />
        <meshStandardMaterial color={earth.colors.accent} emissive={earth.colors.glow} emissiveIntensity={0.3} metalness={0.5} roughness={0.4} />
      </mesh>
      {earth.heroes.map((hero, i) => (
        <HeroPin
          key={hero.name}
          position={pins[i]}
          name={hero.name}
          location={hero.location}
          color={earth.colors.rim}
          interactive={interactive}
        />
      ))}
    </group>
  );
}

export default function Globe({
  earth,
  interactive = false,
}: {
  earth: Earth;
  interactive?: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={1.1} color={earth.colors.rim} />
      <pointLight position={[-3, -2, -3]} intensity={0.4} color={earth.colors.glow} />
      {earth.shape === "brutalist" ? (
        <TvaMesh earth={earth} interactive={interactive} />
      ) : (
        <EarthMesh earth={earth} interactive={interactive} />
      )}
      {interactive && (
        <OrbitControls enablePan={false} minDistance={1.8} maxDistance={5} />
      )}
    </>
  );
}
