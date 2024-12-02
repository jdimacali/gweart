import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Bats from "./Bats";

function CameraController() {
  return (
    <OrbitControls
      enableZoom={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      maxDistance={15}
      minDistance={5}
      enablePan={false}
      enableRotate={false}
    />
  );
}

function Model() {
  const { scene } = useGLTF("/haunted house/scene.gltf");
  const [rotationDirection, setRotationDirection] = useState(1);
  const maxRotation = Math.PI / 16; // Smaller rotation limit
  const rotationSpeed = 0.0005; // Increased speed for smoother movement
  const rotationRef = useRef(-Math.PI / 40); // Start slightly to the left
  const isMovingRef = useRef(true);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name.includes("Lune")) {
        child.visible = false;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!isMovingRef.current) return;

    rotationRef.current += rotationSpeed * rotationDirection;
    scene.rotation.y = rotationRef.current;

    // Check rotation limits
    if (rotationRef.current >= maxRotation) {
      rotationRef.current = maxRotation;
      isMovingRef.current = false;
      setTimeout(() => {
        setRotationDirection(-1);
        isMovingRef.current = true;
      }, 1000); // Pause for 1 second at limit
    } else if (rotationRef.current <= -maxRotation) {
      rotationRef.current = -maxRotation;
      isMovingRef.current = false;
      setTimeout(() => {
        setRotationDirection(1);
        isMovingRef.current = true;
      }, 1000); // Pause for 1 second at limit
    }
  });

  return <primitive object={scene} position={[0.2, -0.175, 0]} />;
}

const HauntedHouse = () => {
  return (
    <div className="h-[90vh] w-full absolute">
      <Canvas
        shadows
        camera={{ position: [-7.5, 10, 5], fov: 4 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} color="#ffffff" />
          <directionalLight
            position={[5, 5, 5]}
            castShadow
            intensity={0.6}
            color="#b6aeff"
            shadow-mapSize={1024}
          />
          <spotLight
            position={[0, -10, 0]}
            intensity={0.3}
            angle={0.3}
            penumbra={1}
            castShadow
            color="#ffffff"
          />
          <spotLight
            position={[5, 15, 0]}
            intensity={0.2}
            angle={0.2}
            penumbra={1}
            color="#ffffff"
          />
          <fog attach="fog" args={["#666666", 12, 22]} />
          <Model />
          <Bats />
          <CameraController />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply pointer-events-none" />
    </div>
  );
};

export default HauntedHouse;
