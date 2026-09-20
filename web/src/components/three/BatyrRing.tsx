"use client";

/**
 * Круг портретов: карточки стоят по окружности лицом наружу, группа медленно
 * вращается, мышью её можно крутить. Наведение поднимает карточку и пишет id
 * в стор — оверлей поверх канваса показывает имя. Клик ведёт на страницу батыра.
 */
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { type Group, type Mesh, type Texture } from "three";
import type { Batyr } from "@/data/batyrs";
import { useApp } from "@/lib/store";

const CARD_W = 1.35;
const CARD_H = 1.8;
const RADIUS = 5.4;

function Card({
  batyr,
  angle,
  texture,
  frameTexture,
  frameColor,
  onOpen,
}: {
  batyr: Batyr;
  angle: number;
  texture: Texture;
  frameTexture: Texture;
  frameColor: string;
  onOpen: (id: string) => void;
}) {
  const ref = useRef<Group>(null);
  const photo = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setActiveBatyr = useApp((s) => s.setActiveBatyr);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    // Плавный подъём и приближение к зрителю при наведении
    const targetY = hovered ? 0.28 : 0;
    const targetScale = hovered ? 1.07 : 1;
    const k = 1 - Math.pow(0.0015, delta);
    g.position.y += (targetY - g.position.y) * k;
    g.scale.setScalar(g.scale.x + (targetScale - g.scale.x) * k);
  });

  const enter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    setActiveBatyr(batyr.id);
    document.body.style.cursor = "pointer";
  };
  const leave = () => {
    setHovered(false);
    setActiveBatyr(null);
    document.body.style.cursor = "";
  };

  return (
    <group
      position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
      rotation={[0, angle, 0]}
    >
      <group ref={ref} onPointerOver={enter} onPointerOut={leave} onClick={() => onOpen(batyr.id)}>
        {/* Золотая оправа-паспарту */}
        <RoundedBox args={[CARD_W + 0.16, CARD_H + 0.16, 0.08]} radius={0.07} smoothness={4}>
          {/* Оправа обтянута орнаментом — обратная сторона карточки тоже узорчатая */}
          {/* Оправа обтянута орнаментом, торцы карточки тоже узорчатые */}
          <meshStandardMaterial
            map={frameTexture}
            color={frameColor}
            metalness={0.8}
            roughness={0.3}
            emissive={frameColor}
            emissiveIntensity={hovered ? 0.45 : 0.15}
          />
        </RoundedBox>
        {/* Портрет с обеих сторон: круг виден и «изнутри» */}
        <mesh ref={photo} position={[0, 0, 0.05]}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export function BatyrRing({ batyrs, frameColor = "#f7e3b8" }: { batyrs: Batyr[]; frameColor?: string }) {
  const group = useRef<Group>(null);
  const drag = useRef({ active: false, x: 0, velocity: 0 });
  const router = useRouter();

  const textures = useTexture(batyrs.map((b) => b.image ?? "/img/hero.jpg"));
  const frameTexture = useTexture("/img/ornament-tex.jpg");

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // Автоповорот + инерция от перетаскивания
    g.rotation.y += delta * 0.12 + drag.current.velocity;
    drag.current.velocity *= 0.92;
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    drag.current = { active: true, x: e.clientX, velocity: 0 };
  };
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    drag.current.velocity = dx * 0.0008;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <group
      ref={group}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      {batyrs.map((b, i) => (
        <Card
          key={b.id}
          batyr={b}
          angle={(i / batyrs.length) * Math.PI * 2}
          texture={textures[i]}
          frameTexture={frameTexture}
          frameColor={frameColor}
          onOpen={(id) => router.push(`/batyrs/${id}`)}
        />
      ))}
    </group>
  );
}
