import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Scene() {
    const ref = useRef();
    useFrame((_state, delta) => {
        ref.current.rotation.y += delta;
    });
    return (
        <>
            <ambientLight intensity={0.5} />
            <mesh ref={ref} scale={1}>
                <boxGeometry args={[10,10,10]}/>
                <meshStandardMaterial />
            </mesh>
            <OrbitControls />
        </>
    );
}
