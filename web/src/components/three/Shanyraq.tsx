"use client";

/**
 * Шаңырақ — купольный обод юрты: два обода и пологая решётка күлдіреуіш из
 * пересекающихся дуг. Собирается из примитивов, модель загружать не нужно.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const ARCS = 8;
/** Высота купола относительно радиуса: реальный шаңырақ пологий */
const DOME = 0.32;

export function Shanyraq({ y = 3.1, radius = 1.9, color = "#d6aa5c" }: { y?: number; radius?: number; color?: string }) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.07;
  });

  return (
    <group ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Внешний и внутренний ободы */}
      {[radius, radius * 0.72].map((r, i) => (
        <mesh key={`hoop-${i}`}>
          <torusGeometry args={[r, i === 0 ? 0.05 : 0.03, 16, 96]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.25}
            emissive={color}
            emissiveIntensity={0.28}
          />
        </mesh>
      ))}

      {/* Күлдіреуіш — пологие дуги через центр */}
      {Array.from({ length: ARCS }, (_, i) => {
        const a = (i / ARCS) * Math.PI;
        return (
          <group key={`arc-${i}`} rotation={[0, 0, a]} scale={[1, 1, DOME]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.02, 8, 64, Math.PI]} />
              <meshStandardMaterial
                color={color}
                metalness={0.85}
                roughness={0.3}
                emissive={color}
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
