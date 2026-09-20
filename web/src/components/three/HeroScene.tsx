"use client";

/**
 * 3D-сцена главной: степная панорама вокруг, зеркальный пол, круг портретов
 * и шаңырақ сверху. Рендерится только на клиенте (dynamic import с ssr: false),
 * при prefers-reduced-motion или без WebGL показывается статичный кадр.
 */
import { Suspense, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, MeshReflectorMaterial, Sparkles, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BackSide, type Group } from "three";
import type { Batyr } from "@/data/batyrs";
import { useApp } from "@/lib/store";
import { BatyrRing } from "./BatyrRing";
import { Shanyraq } from "./Shanyraq";
import { asset } from "@/lib/asset";

/** Палитра сцены: днём светлая степь, в тёмной теме — закатная. */
interface Palette {
  sky: string;
  background: string;
  fog: string;
  fogRange: [number, number];
  floor: string;
  ambient: number;
  directional: number;
  point: number;
  frame: string;
  sparkles: string;
  sparklesOpacity: number;
  bloom: number;
  vignette: number;
}

const PALETTE: Record<"light" | "dark", Palette> = {
  light: {
    sky: asset("/img/steppe-pano-light.jpg"),
    background: "#faf6ef",
    fog: "#f6efe2",
    fogRange: [30, 60],
    floor: "#cdbb9a",
    ambient: 0.9,
    directional: 1.1,
    point: 6,
    frame: "#b8842f",
    sparkles: "#a8782f",
    sparklesOpacity: 0.5,
    bloom: 0.22,
    vignette: 0.35,
  },
  dark: {
    sky: asset("/img/steppe-pano.jpg"),
    background: "#0b0a09",
    fog: "#120c06",
    fogRange: [18, 46],
    floor: "#1d150c",
    ambient: 0.45,
    directional: 1.6,
    point: 18,
    frame: "#d6aa5c",
    sparkles: "#f2cf85",
    sparklesOpacity: 0.7,
    bloom: 0.55,
    vignette: 0.75,
  },
};

/** Панорама степи на вывернутой сфере — «небо» сцены. */
function SteppeSky({ src }: { src: string }) {
  const tex = useTexture(src);
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.004;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[34, 48, 32]} />
        <meshBasicMaterial map={tex} side={BackSide} toneMapped={false} fog={false} />
      </mesh>
    </group>
  );
}

/** Пол с мягким отражением карточек. */
function Floor({ simple, palette }: { simple: boolean; palette: Palette }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
      <circleGeometry args={[16, 64]} />
      {simple ? (
        <meshStandardMaterial color={palette.floor} roughness={0.8} metalness={0.2} />
      ) : (
        <MeshReflectorMaterial
          resolution={512}
          mixBlur={1.2}
          mixStrength={2.4}
          blur={[320, 90]}
          mirror={0.42}
          color={palette.floor}
          metalness={0.55}
          roughness={0.8}
        />
      )}
    </mesh>
  );
}

/** Камера мягко следует за курсором — сцена «дышит» без OrbitControls. */
function CameraRig() {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const k = 1 - Math.pow(0.002, delta);
    camera.position.set(
      camera.position.x + (pointer.x * 1.3 - camera.position.x) * k,
      camera.position.y + (1.5 + pointer.y * 0.5 - camera.position.y) * k,
      camera.position.z,
    );
    camera.lookAt(0, 0.5, 0);
  });
  return null;
}

function StaticFallback({ light }: { light: boolean }) {
  return (
    <div className="absolute inset-0">
      <Image
        src={light ? asset("/img/steppe-pano-light.jpg") : asset("/img/hero.jpg")}
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div
        className={
          light
            ? "absolute inset-0 bg-[linear-gradient(100deg,rgba(250,246,239,.92),rgba(250,246,239,.5)_60%,transparent)]"
            : "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"
        }
      />
    </div>
  );
}

function webglAvailable() {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

export default function HeroScene({ batyrs }: { batyrs: Batyr[] }) {
  // Сцена рендерится только в браузере (dynamic ssr: false), поэтому меряем сразу
  const [enabled] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches && webglAvailable());
  const [lowPower] = useState(() => matchMedia("(max-width: 860px)").matches);

  const theme = useApp((s) => s.theme);
  const palette = PALETTE[theme];

  const ring = useMemo(() => batyrs.filter((b) => b.image).slice(0, 10), [batyrs]);

  if (!enabled) return <StaticFallback light={theme === "light"} />;

  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.75]}
      camera={{ position: [0, 1.5, 12.6], fov: 40 }}
      gl={{ antialias: !lowPower, powerPreference: "high-performance" }}
      // inline-стиль, а не класс: Canvas сам выставляет position/width/height инлайном
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.fog, palette.fogRange[0], palette.fogRange[1]]} />

      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[4, 6, 6]} intensity={palette.directional} color="#ffd9a0" />
      <pointLight position={[0, 3.2, 0]} intensity={palette.point} distance={14} color="#f2cf85" />

      <Suspense fallback={null}>
        <SteppeSky src={palette.sky} />
        <Floor simple={lowPower} palette={palette} />
        <BatyrRing batyrs={ring} frameColor={palette.frame} />
        <Shanyraq color={palette.frame} />
        <Sparkles
          count={lowPower ? 40 : 120}
          scale={[16, 7, 16]}
          size={2.4}
          speed={0.3}
          color={palette.sparkles}
          opacity={palette.sparklesOpacity}
        />
      </Suspense>

      <CameraRig />
      <AdaptiveDpr pixelated />

      {!lowPower && (
        <EffectComposer>
          <Bloom intensity={palette.bloom} luminanceThreshold={0.6} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={palette.vignette} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
