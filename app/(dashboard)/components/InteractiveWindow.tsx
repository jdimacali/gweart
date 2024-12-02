import { useGLTF } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as THREE from "three";

interface WindowProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  route: string;
}

const InteractiveWindow = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  route,
}: WindowProps) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF("/models/window.gltf");

  const handleClick = () => {
    if (route.startsWith("http")) {
      window.open(route, "_blank");
    } else {
      router.push(route);
    }
  };

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
    // Add glow effect
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0xb6aeff);
        child.material.emissiveIntensity = 0.5;
      }
    });
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "default";
    // Remove glow effect
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0;
      }
    });
  };

  return (
    <primitive
      object={scene.clone()}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
};

export default InteractiveWindow;
