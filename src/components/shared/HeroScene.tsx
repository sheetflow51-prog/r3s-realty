import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#c9a227";
const GREEN = "#1a5f2a";

function LandGrid() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group ref={ref} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -2, 0]}>
      <gridHelper
        args={[60, 30, GOLD, GOLD]}
        position={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#0a1a0a"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

interface BoxProps {
  position: [number, number, number];
  size: [number, number, number];
  delay: number;
}

function FloatingBox({ position, size, delay }: BoxProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.25;
    ref.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#162816"
        emissive={GREEN}
        emissiveIntensity={0.15}
        metalness={0.4}
        roughness={0.4}
      />
    </mesh>
  );
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  const data = useMemo(() => {
    const arr: { p: THREE.Vector3; speed: number; offset: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        p: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          Math.random() * 12 - 4,
          (Math.random() - 0.5) * 24
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const d = data[i];
      d.p.y += d.speed * delta * 0.4;
      if (d.p.y > 8) d.p.y = -4;
      dummy.position.set(
        d.p.x + Math.sin(t * 0.3 + d.offset) * 0.4,
        d.p.y,
        d.p.z
      );
      const s = 0.04 + Math.sin(t + d.offset) * 0.02;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.85} />
    </instancedMesh>
  );
}

function Scene({ mobile }: { mobile: boolean }) {
  const particleCount = mobile ? 80 : 200;
  return (
    <>
      <ambientLight intensity={0.35} color={GREEN} />
      <pointLight position={[6, 8, 4]} intensity={1.4} color={GOLD} />
      <pointLight position={[-8, 5, -4]} intensity={0.6} color="#3a8a52" />
      <fog attach="fog" args={["#0a0f0a", 12, 32]} />

      <LandGrid />

      <FloatingBox position={[-4, 1.2, -2]} size={[1.2, 2.4, 1.2]} delay={0} />
      <FloatingBox position={[3.5, 0.6, -1]} size={[1.8, 1.2, 1.6]} delay={1.5} />
      <FloatingBox position={[1, 1.6, -4]} size={[1, 3.2, 1]} delay={3} />
      <FloatingBox position={[-2.5, 0.4, 1]} size={[1.4, 0.8, 1.4]} delay={2} />

      <ParticleField count={particleCount} />
    </>
  );
}

export default function HeroScene() {
  const mobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 3.5, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
