"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

/* ============================================================
   Crystalline Shards — instanced floating crystals
   representing the disciplines of Maysoun's Career Bag
   ============================================================ */

type ShardFieldProps = {
  count?: number;
  spread?: number;
};

export function ShardField({ count = 38, spread = 28 }: ShardFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const speeds = useRef<number[]>([]);

  const shards = useMemo(() => {
    const items: { pos: THREE.Vector3; rot: THREE.Euler; scale: number; color: THREE.Color; phase: number }[] = [];
    const palette = [
      new THREE.Color("#E8A04A"),
      new THREE.Color("#FFB866"),
      new THREE.Color("#B8742A"),
      new THREE.Color("#E8B4A0"),
      new THREE.Color("#7FFF8B"),
      new THREE.Color("#B070E8"),
      new THREE.Color("#5FD9E8"),
    ];
    for (let i = 0; i < count; i++) {
      const r = spread * (0.45 + Math.random() * 0.9);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      items.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.55,
          r * Math.sin(phi) * Math.sin(theta) - 4
        ),
        rot: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        scale: 0.18 + Math.random() * 0.55,
        color: palette[Math.floor(Math.random() * palette.length)],
        phase: Math.random() * Math.PI * 2,
      });
      speeds.current.push(0.05 + Math.random() * 0.15);
    }
    return items;
  }, [count, spread]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < shards.length; i++) {
      const s = shards[i];
      const speed = speeds.current[i];
      dummy.position.set(
        s.pos.x + Math.sin(t * speed + s.phase) * 0.6,
        s.pos.y + Math.cos(t * speed * 0.8 + s.phase) * 0.5,
        s.pos.z + Math.sin(t * speed * 0.5 + s.phase) * 0.4
      );
      dummy.rotation.set(
        s.rot.x + t * 0.08 * speed,
        s.rot.y + t * 0.12 * speed,
        s.rot.z + t * 0.05 * speed
      );
      const pulse = 1 + Math.sin(t * 0.8 + s.phase) * 0.06;
      dummy.scale.setScalar(s.scale * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, s.color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        roughness={0.18}
        metalness={0.85}
        emissive={"#E8A04A"}
        emissiveIntensity={0.18}
        flatShading
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  );
}

/* ============================================================
   Central Hero Crystal — a large faceted gem
   ============================================================ */

export function HeroCrystal({ scrollProgress }: { scrollProgress: () => number }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerMatRef = useRef<any>(null);
  const innerMatRef = useRef<any>(null);
  const wireMatRef = useRef<any>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollProgress();
    // Fade out aggressively after hero region
    const fade = Math.max(0, 1 - Math.max(0, (s - 0.05) * 4));
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + s * 1.2;
      groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.12 + s * 0.4;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.18 - s * 2.5;
      const sc = Math.max(0.05, 1 - s * 0.55);
      groupRef.current.scale.setScalar(sc);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.32;
      innerRef.current.rotation.z = t * 0.18;
    }
    // Fade materials based on scroll
    if (outerMatRef.current) outerMatRef.current.opacity = 0.85 * fade;
    if (innerMatRef.current) {
      innerMatRef.current.emissiveIntensity = 2.6 * fade;
      innerMatRef.current.opacity = fade;
    }
    if (wireMatRef.current) wireMatRef.current.opacity = 0.12 * fade;
  });

  return (
    <group ref={groupRef}>
      {/* Outer faceted shell — standard material (cheaper than transmission) */}
      <mesh>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          ref={outerMatRef}
          color="#FFB866"
          emissive="#E8A04A"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.85}
          flatShading
        />
      </mesh>
      {/* Inner glowing core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color="#FFB866"
          emissive="#FFB866"
          emissiveIntensity={2.6}
          roughness={0.4}
          metalness={0.2}
          transparent
        />
      </mesh>
      {/* Outer wireframe halo */}
      <mesh scale={1.85}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial
          ref={wireMatRef}
          color="#E8A04A"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   Atmospheric particles — drifting dust that catches the light
   ============================================================ */

export function DustField() {
  return (
    <>
      <Sparkles
        count={120}
        scale={[24, 12, 18]}
        size={1.4}
        speed={0.18}
        opacity={0.55}
        color="#FFB866"
      />
      <Sparkles
        count={60}
        scale={[30, 16, 22]}
        size={3}
        speed={0.08}
        opacity={0.32}
        color="#FFE3B0"
      />
    </>
  );
}

/* ============================================================
   Camera parallax — subtle response to pointer movement
   ============================================================ */

export function CameraRig({ intensity = 0.5 }: { intensity?: number }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    target.current.set(
      pointer.x * intensity,
      -pointer.y * intensity * 0.6,
      8
    );
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ============================================================
   Light rig — key, rim, fill
   ============================================================ */

export function CinematicLights() {
  return (
    <>
      <ambientLight intensity={0.18} color="#9FA8C0" />
      <directionalLight
        position={[5, 6, 4]}
        intensity={1.4}
        color="#FFE3B0"
      />
      <pointLight position={[-6, -2, -4]} intensity={1.6} color="#E8A04A" distance={20} />
      <pointLight position={[6, 4, -6]} intensity={1.0} color="#B070E8" distance={20} />
      <spotLight
        position={[0, 10, 2]}
        angle={0.6}
        penumbra={1}
        intensity={2.0}
        color="#FFB866"
        castShadow={false}
      />
    </>
  );
}
