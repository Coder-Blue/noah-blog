"use client";

import { Suspense, useEffect, useState } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "../loader";

export function Computers({ isMobile }: { isMobile: boolean }) {
  const computer = useGLTF("./models/desktop_pc/scene.glb");

  return (
    <mesh>
      <hemisphereLight intensity={4} groundColor={"black"} />
      <pointLight intensity={2} />
      <spotLight
        position={[20, 50, 10]}
        angle={0.12}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 3.75 : 4.55}
        position={isMobile ? [0.35, -2.5, 0] : [0, -2.75, 0]}
        rotation={[-0.01, -0.7, -0.25]}
      />
    </mesh>
  );
}

export default function ComputersCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    function handleMediaQueryChange(event: any) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
