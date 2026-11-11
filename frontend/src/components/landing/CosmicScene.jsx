import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating cosmic particles.
function ParticleField() {
  const pointsRef = useRef(null);
    
  const screenWidth = useThree((state) => state.size.width);

  const particleCount = screenWidth < 768 ? 450 : 900;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] =
        radius * Math.sin(phi) * Math.cos(theta);

      positions[i * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3 + 2] =
        radius * Math.cos(phi);
    }

    return positions;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.025;

    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      state.pointer.y * 0.08,
      0.03
    );

    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      -state.pointer.x * 0.08,
      0.03
    );
  });

  return (
    <Points
      ref={pointsRef}
      positions={particles}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color="#e98f63"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Small glowing stars with a twinkling effect.
function StarField() {
  const starsRef = useRef(null);
  const materialRef = useRef(null);
  const screenWidth = useThree((state) => state.size.width);
  const starCount = screenWidth < 768 ? 40 : 75;

  const positions = useMemo(() => {
  const coords = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    return coords;
  }, [starCount]);

  useFrame((state, delta) => {
    if (!starsRef.current || !materialRef.current) return;

    starsRef.current.rotation.y += delta * 0.008;

    materialRef.current.opacity =
      0.65 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
  });

  return (
    <Points
      ref={starsRef}
      positions={positions}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        ref={materialRef}
        transparent
        color="#ffe1b5"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Layered glowing cosmic structure.
function NebulaCore() {
  const coreRef = useRef(null);

  useFrame((state, delta) => {
    if (!coreRef.current) return;

    coreRef.current.rotation.y += delta * 0.06;
    coreRef.current.rotation.x += delta * 0.02;
  });

  return (
    <group ref={coreRef} position={[2, 0, -0.5]}>
      {/* Outer orange glow */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#e07b4c"
          transparent
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Middle cosmic layer */}
      <mesh scale={0.68}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#e98f63"
          transparent
          opacity={0.055}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner purple-orange core */}
      <mesh position={[0.3, 0.2, 0.1]} scale={0.35}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#a66bce"
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Mouse-responsive scene.
// This component MUST be rendered inside Canvas.


function SceneParallax() {
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);
  const starsRef = useRef(null);
  const nebulaRef = useRef(null);

  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerRef.current.x = event.detail.x;
      pointerRef.current.y = event.detail.y;
    };

    window.addEventListener("cosmic-pointer", handlePointerMove);

    return () => {
      window.removeEventListener("cosmic-pointer", handlePointerMove);
    };
  }, []);

  useFrame(() => {
    const { x, y } = pointerRef.current;

    if (starsRef.current) {
      starsRef.current.position.x = THREE.MathUtils.lerp(
        starsRef.current.position.x,
        x * 0.12,
        0.045
      );

      starsRef.current.position.y = THREE.MathUtils.lerp(
        starsRef.current.position.y,
        y * 0.08,
        0.045
      );
    }

    if (particlesRef.current) {
      particlesRef.current.position.x = THREE.MathUtils.lerp(
        particlesRef.current.position.x,
        x * 0.35,
        0.045
      );

      particlesRef.current.position.y = THREE.MathUtils.lerp(
        particlesRef.current.position.y,
        y * 0.22,
        0.045
      );
    }

    if (nebulaRef.current) {
      nebulaRef.current.position.x = THREE.MathUtils.lerp(
        nebulaRef.current.position.x,
        x * 0.65,
        0.045
      );

      nebulaRef.current.position.y = THREE.MathUtils.lerp(
        nebulaRef.current.position.y,
        y * 0.42,
        0.045
      );
    }
  });

  return (
    <group ref={sceneRef}>
      <group ref={starsRef}>
        <StarField />
      </group>

      <group ref={particlesRef}>
        <ParticleField />
      </group>

      <group ref={nebulaRef}>
        <NebulaCore />
      </group>
    </group>
  );
}



function CosmicScene({ children }) {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={window.innerWidth < 768 ? [1, 1] : [1, 1.5]}
        frameloop={prefersReducedMotion ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        }}
      >
        <>
        <SceneParallax />
        {children}
        </>
      </Canvas>
    </div>
  );
}

export default CosmicScene;
