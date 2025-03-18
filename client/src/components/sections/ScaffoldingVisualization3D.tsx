
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CalculationResult } from '@shared/schema';

interface ScaffoldingVisualization3DProps {
  result: CalculationResult;
  className?: string;
}

export default function ScaffoldingVisualization3D({ result, className }: ScaffoldingVisualization3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current || !result) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf0f0f0);

    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Parse dimensions from result
    const [length, width, height] = result.dimensions.split('m x ').map(d => parseFloat(d));
    
    // Create scaffolding geometry based on building sides
    if (result.buildingSides === 2) {
      // Create L-shaped building walls (darker color)
      const geometry = new THREE.BoxGeometry(length, height, 0.2);
      const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x505050 });
      const wall1 = new THREE.BoxGeometry(length, height, 0.00005);
      const wall2 = new THREE.BoxGeometry(0.2, height, length);
      
      const wallMesh1 = new THREE.Mesh(geometry, wallMaterial);
      
      wallMesh1.position.set(length/2, height/2, 0);
      
      // scene.add(wallMesh1);

      // Create scaffolding (lighter color)
      const scaffoldMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
      const scaffold1 = new THREE.BoxGeometry(length, height, width);
      const scaffold2 = new THREE.BoxGeometry(width, height, length);
      
      const scaffoldMesh1 = new THREE.Mesh(scaffold1, scaffoldMaterial);
      const scaffoldMesh2 = new THREE.Mesh(scaffold2, scaffoldMaterial);
      
      // Position scaffolding outside the walls
      scaffoldMesh1.position.set(length/2, height/2, width/2 + 0.2);
      scaffoldMesh2.position.set(-width/2 - 0.2, height/2, length/2);
      
      // scene.add(scaffoldMesh1);
      // scene.add(scaffoldMesh2);
    } else {
      // Create linear scaffolding for other cases
      const geometry = new THREE.BoxGeometry(length, height, 0.2);
      const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, height/2, 2);
      // scene.add(mesh);
    }

    // Create scaffolding structure
    const createScaffolding = () => {
      const frameGeometry = new THREE.BoxGeometry(0.1, 2, 0.1);
      const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x4a90e2 });
      
      // Add vertical frames
      const numFramesX = Math.ceil(result.frames.quantity);
      const numFramesZ = 2;
      
      for (let x = 0; x < numFramesX; x++) {
        for (let z = 0; z < numFramesZ; z++) {
          const frame = new THREE.Mesh(frameGeometry, frameMaterial);
          frame.position.set(x * 1.5, 1, z * 1.5);
          scene.add(frame);
        }
      }

      // Add horizontal beams
      const beamGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.05);
      const beamMaterial = new THREE.MeshPhongMaterial({ color: 0x27ae60 });
      
      for (let x = 0; x < numFramesX - 1; x++) {
        for (let z = 0; z < numFramesZ; z++) {
          const beam = new THREE.Mesh(beamGeometry, beamMaterial);
          beam.position.set(x * 1.5 + 0.75, 1.8, z * 1.5);
          scene.add(beam);
        }
      }

      // Add platforms
      const platformGeometry = new THREE.BoxGeometry(1.4, 0.02, 1.4);
      const platformMaterial = new THREE.MeshPhongMaterial({ color: 0xf5a623 });
      
      for (let x = 0; x < numFramesX - 1; x++) {
        for (let z = 0; z < numFramesZ - 1; z++) {
          const platform = new THREE.Mesh(platformGeometry, platformMaterial);
          platform.position.set(x * 1.5 + 0.75, 1.9, z * 1.5 + 0.75);
          scene.add(platform);
        }
      }
    };

    createScaffolding();

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        // Rotate camera around the scene
        const time = Date.now() * 0.001;
        camera.position.x = Math.cos(time * 0.5) * 7;
        camera.position.z = Math.sin(time * 0.5) * 7;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [result]);

  return <div ref={containerRef} className={`w-full h-[400px] ${className}`} />;
}
