import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 128, 128);
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const height =
        Math.sin(x * 0.5) * Math.cos(y * 0.3) * 1.8 +
        Math.sin(x * 0.8 + y * 0.6) * 0.9 +
        Math.cos(x * 1.2 - y * 0.4) * 0.6 +
        Math.sin(x * 2.0 + y * 1.5) * 0.2;
      positions.setZ(i, height);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -3]}>
      <meshStandardMaterial
        color="#1a3a2a"
        roughness={0.9}
        metalness={0.1}
        wireframe={false}
        flatShading
      />
    </mesh>
  );
};

const FloatingCompass = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref} position={[3.5, 1.5, -1]}>
        <mesh>
          <torusGeometry args={[0.3, 0.05, 16, 32]} />
          <meshStandardMaterial color="#c8913a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.15, 0.4, 4]} />
          <meshStandardMaterial color="#c8913a" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingPeak = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh position={position}>
        <coneGeometry args={[0.6, 1.5, 4]} />
        <meshStandardMaterial color="#2a4a3a" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[position[0], position[1] + 0.55, position[2]]}>
        <coneGeometry args={[0.25, 0.5, 4]} />
        <meshStandardMaterial color="#ddd5c8" roughness={0.9} flatShading />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const points = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 8 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 200; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
          count={200}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c8913a" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const MountainScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#0f0d08", 8, 25]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 3]} intensity={1.2} color="#c8913a" />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#4a8a6a" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#c8913a" distance={15} />
        <Terrain />
        <FloatingPeak position={[-3, 0, -4]} />
        <FloatingPeak position={[2, -0.5, -5]} />
        <FloatingPeak position={[-1, -0.3, -6]} />
        <FloatingCompass />
        <Particles />
        <Stars radius={50} depth={30} count={1500} factor={3} saturation={0.2} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export default MountainScene;
