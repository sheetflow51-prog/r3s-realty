import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[24, 24, 32, 32]} />
      <meshStandardMaterial
        color="#0f2a14"
        roughness={1}
        metalness={0}
        wireframe={false}
      />
    </mesh>
  );
}

function GridOverlay() {
  return (
    <gridHelper
      args={[24, 24, "#c9a227", "#3a5b3a"]}
      position={[0, 0.005, 0]}
    />
  );
}

function Pin() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        1.2 + Math.sin(state.clock.getElapsedTime() * 1.4) * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={[0, 1.2, 0]}>
      <coneGeometry args={[0.35, 1.1, 16]} />
      <meshStandardMaterial
        color="#c9a227"
        emissive="#c9a227"
        emissiveIntensity={0.5}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

function PulseRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s1 = ((t * 0.5) % 1.5) + 0.1;
    const s2 = (((t + 0.7) * 0.5) % 1.5) + 0.1;
    if (r1.current) {
      r1.current.scale.set(s1, s1, 1);
      const mat = r1.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 - (s1 / 1.5) * 0.6;
    }
    if (r2.current) {
      r2.current.scale.set(s2, s2, 1);
      const mat = r2.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 - (s2 / 1.5) * 0.5;
    }
  });
  return (
    <>
      <mesh ref={r1} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.6, 1.75, 64]} />
        <meshBasicMaterial color="#c9a227" transparent opacity={0.6} />
      </mesh>
      <mesh ref={r2} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2.6, 2.8, 64]} />
        <meshBasicMaterial color="#c9a227" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

function VillageDots() {
  const dots: { pos: [number, number, number] }[] = [
    { pos: [-4, 0.05, 2] },
    { pos: [3.5, 0.05, -1] },
    { pos: [-2, 0.05, -3.5] },
    { pos: [4, 0.05, 3] },
    { pos: [1.5, 0.05, 4] },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#f0ebe0"
            emissive="#f0ebe0"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={group}>
      <Terrain />
      <GridOverlay />
      <Pin />
      <PulseRings />
      <VillageDots />
    </group>
  );
}

export default function TownshipMap() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [6, 7, 9], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} color="#1a5f2a" />
        <pointLight position={[5, 8, 5]} intensity={1.2} color="#c9a227" />
        <fog attach="fog" args={["#0a0f0a", 10, 22]} />
        <Rig />
      </Suspense>
    </Canvas>
  );
}
