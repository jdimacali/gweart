import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Bats from "./Bats";
import Spin from "@/components/Spin";

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

function Model({ onLoad }: any) {
  const { scene } = useGLTF("/haunted house/scene.gltf");
  const [rotationDirection, setRotationDirection] = useState(1);
  const maxRotation = Math.PI / 16;
  const rotationSpeed = 0.0005;
  const rotationRef = useRef(-Math.PI / 40);
  const isMovingRef = useRef(true);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name?.includes("Lune")) {
        child.visible = false;
      }
    });
    onLoad();
  }, [scene, onLoad]);

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
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="h-[90vh] w-full absolute">
      {isLoading && (
        <div
          className="absolute w-full flex justify-center items-center"
          style={{ top: "calc(30vh + 180px)" }}
        >
          <Spin />
        </div>
      )}

      <Canvas
        shadows
        camera={{ position: [-7.5, 10, 5], fov: 4 }}
        gl={{ antialias: true }}
        className="overflow-hidden"
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
          <Model onLoad={handleLoad} />
          <Bats />
          <CameraController />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply pointer-events-none" />
    </div>
  );
};

export default HauntedHouse;
