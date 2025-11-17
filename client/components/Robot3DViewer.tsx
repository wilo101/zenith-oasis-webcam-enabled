import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";

interface RobotModelProps {
  scale?: number;
  modelPath: string;
}

function RobotModel({ scale = 1.4, modelPath }: RobotModelProps) {
  const { scene } = useGLTF(modelPath);
  const { camera, controls } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    // Wait for scene to fully load and render
    const timer = setTimeout(() => {
      // Calculate bounding box for the entire scene (all parts)
      const box = new THREE.Box3();
      box.setFromObject(scene);

      if (box.isEmpty()) return;

      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      if (maxDim > 0 && camera instanceof THREE.PerspectiveCamera) {
        // Calculate optimal camera distance to fit all parts (including exploded view)
        const fov = camera.fov * (Math.PI / 180);
        // Use larger padding (1.8) to ensure all parts are visible in exploded view
        const distance = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.8;

        // Position camera at an angle to view all parts better
        camera.position.set(
          center.x + distance * 0.6,
          center.y + distance * 0.4,
          center.z + distance * 0.8
        );
        camera.lookAt(center);
        camera.updateProjectionMatrix();

        // Update controls target to center of all parts
        if (controls && 'target' in controls) {
          (controls as any).target.copy(center);
          (controls as any).update();
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [scene, camera, controls]);

  return (
    <group ref={groupRef}>
      {/* Subtle background gradient plane */}
      <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial 
          color="#0a0f14" 
          opacity={0.3} 
          transparent 
        />
      </mesh>
      <primitive object={scene} scale={scale} position={[0, -0.2, 0]} />
    </group>
  );
}

interface Robot3DViewerProps {
  className?: string;
  scale?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export default function Robot3DViewer({
  className = "",
  scale = 1.4,
  autoRotate = true,
  autoRotateSpeed = 1,
}: Robot3DViewerProps) {
  const baseUrl = import.meta.env.BASE_URL || "/";
  // Start with fallback model, try to load robot.glb if available
  const [modelPath, setModelPath] = useState(`${baseUrl}models/metal_knuckles_modern.glb`);

  useEffect(() => {
    // Check if robot.glb exists
    const robotPath = `${baseUrl}models/robot.glb`;
    fetch(robotPath, { method: "HEAD" })
      .then((res) => {
        if (res.ok && res.headers.get("content-type")?.includes("model/gltf-binary")) {
          setModelPath(robotPath);
        }
      })
      .catch(() => {
        // Keep fallback model
      });
  }, [baseUrl]);

  return (
    <div className={`w-full h-full rounded-xl overflow-hidden bg-[#0a0f14]/60 backdrop-blur-xl border border-white/5 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.75} />
        <hemisphereLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        {/* 3D Model */}
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#00ffab" wireframe />
            </mesh>
          }
        >
          <RobotModel scale={scale ?? 1.4} modelPath={modelPath} />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableRotate
          enableZoom
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed * 0.6}
          minDistance={0.5}
          maxDistance={30}
          makeDefault
        />
      </Canvas>
    </div>
  );
}


