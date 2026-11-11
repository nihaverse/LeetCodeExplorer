
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Slowly rotating cosmic particles.
function LoginParticles() {
  const pointsRef = useRef(null);
  const width = useThree((state) => state.size.width);
  const count = width < 768 ? 450 : 900;

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      coords[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }

    return coords;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.rotation.x += delta * 0.003;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#e98f63"
        size={0.025}
        sizeAttenuation
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Twinkling stars.
function LoginStars() {
  const starsRef = useRef(null);
  const materialRef = useRef(null);
  const width = useThree((state) => state.size.width);
  const count = width < 768 ? 40 : 75;

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    return coords;
  }, [count]);

  useFrame((state, delta) => {
    if (!starsRef.current || !materialRef.current) return;

    starsRef.current.rotation.y += delta * 0.008;
    materialRef.current.opacity =
      0.55 + Math.sin(state.clock.elapsedTime * 1.2) * 0.18;
  });

  return (
    <Points ref={starsRef} positions={positions} stride={3}>
      <PointMaterial
        ref={materialRef}
        transparent
        color="#ffe1b5"
        size={0.045}
        sizeAttenuation
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Subtle rotating nebula.
function LoginNebula() {
  const nebulaRef = useRef(null);

  useFrame((_, delta) => {
    if (!nebulaRef.current) return;
    nebulaRef.current.rotation.y += delta * 0.025;
    nebulaRef.current.rotation.x += delta * 0.01;
  });

  return (
    <group ref={nebulaRef} position={[2, 0, -1]}>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#e07b4c"
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={0.65}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#a66bce"
          transparent
          opacity={0.045}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Complete Login cosmic scene.
function LoginScene() {
  return (
    <>
      <LoginStars />
      <LoginParticles />
      <LoginNebula />
    </>
  );
}

function LoginBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Deep cosmic base */}
      <div className="absolute inset-0 bg-[#100A08]" />

      {/* Orange nebula — left */}
      <div className="absolute -left-52 top-[-10%] h-[650px] w-[650px] rounded-full bg-[#c65a2d]/25 blur-[150px]" />

      {/* Orange nebula — right */}
      <div className="absolute -right-52 top-[5%] h-[600px] w-[600px] rounded-full bg-[#e07b4c]/20 blur-[150px]" />

      {/* Purple nebula */}
      <div className="absolute right-[5%] top-[35%] h-[450px] w-[450px] rounded-full bg-purple-700/20 blur-[150px]" />

      {/* Lower orange and purple atmosphere */}
      <div className="absolute bottom-[-25%] left-[10%] h-[500px] w-[600px] rounded-full bg-[#a94329]/20 blur-[150px]" />
      <div className="absolute bottom-[-25%] right-[15%] h-[450px] w-[550px] rounded-full bg-purple-600/15 blur-[150px]" />

      {/* Continuous ambient glow */}
      {!reducedMotion && (
        <div className="absolute inset-0 animate-[nebulaPulse_12s_ease-in-out_infinite_alternate] bg-[radial-gradient(ellipse_at_50%_50%,transparent_25%,rgba(16,10,8,0.25)_100%)]" />
      )}

      {/* Three.js atmosphere */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={window.innerWidth < 768 ? [1, 1] : [1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        }}
      >
        <LoginScene />
      </Canvas>

      {/* Orbital curves */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M-150 250 C200 -100 650 50 850 300 S1250 700 1600 350"
          stroke="#e07b4c"
          strokeWidth="1"
        />
        <path
          d="M-100 650 C250 300 650 450 950 650 S1300 850 1550 550"
          stroke="#c47aab"
          strokeWidth="0.8"
        />
        <path
          d="M100 -100 C400 150 850 100 1100 -50"
          stroke="#e98f63"
          strokeWidth="0.7"
        />
      </svg>

      <style>{`
        @keyframes nebulaPulse {
          from { opacity: 0.55; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default LoginBackground;
