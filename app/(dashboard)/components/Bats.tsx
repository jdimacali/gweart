"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface BatProps {
  model: THREE.Group;
  position: [number, number, number];
  scale: [number, number, number];
}

const Bat = ({ model, position, scale }: BatProps) => {
  const batRef = useRef<THREE.Group>(null);

  return (
    <primitive
      ref={batRef}
      object={model}
      position={[position[0], position[1], position[2]]}
      scale={scale}
    />
  );
};

const Bats = () => {
  const { scene } = useGLTF("/bat/scene.gltf");

  return (
    <>
      <Bat model={scene} position={[0, 0.2, 0]} scale={[0.05, 0.05, 0.05]} />
    </>
  );
};

export default Bats;
