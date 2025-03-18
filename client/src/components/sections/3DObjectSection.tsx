import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Scaffold() {
    const groupRef = useRef();
    
    return (
        <group ref={groupRef}>
            {[...Array(4)].map((_, i) => (
                <mesh key={`vertical-${i}`} position={[i * 2 - 3, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
                    <meshStandardMaterial color={'gray'} />
                </mesh>
            ))}
            {[...Array(4)].map((_, i) => (
                <mesh key={`horizontal-${i}`} position={[0, i * 1.5 - 2, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.1, 0.1, 4, 32]} />
                    <meshStandardMaterial color={'gray'} />
                </mesh>
            ))}
            {[...Array(4)].map((_, i) => (
                <mesh key={`depth-${i}`} position={[0, 0, i * 1.5 - 2]} rotation={[0, Math.PI / 2, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 4, 32]} />
                    <meshStandardMaterial color={'gray'} />
                </mesh>
            ))}
        </group>
    );
}

export default function App() {
    return (
        <Canvas camera={{ position: [5, 5, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Scaffold />
            <OrbitControls />
        </Canvas>
    );
}
