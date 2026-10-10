import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import ShoeModel from "./shoemodel";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const RESUME_DELAY = 2000; // ms of stillness before spinning again

export default function Scene({
    upperColor,
    soleColor,
    onSelectPart,
    selectedPart,
    spinning,
    pauseSpin,
}) {
    const handleSelect = (part) => {
        pauseSpin(6000);
        onSelectPart(part);
    };
    return (
        <>
            <ambientLight intensity={0.3} />
            <ResponsiveCamera />
            <Environment preset="city" />
            <ContactShadows
                position={[0, 0, 0]}
                opacity={1}
                scale={20}
                blur={2.5}
                far={6}
                resolution={512}
            />
            <Suspense>
                <ShoeModel
                    upperColor={upperColor}
                    soleColor={soleColor}
                    onSelectPart={handleSelect}
                    selectedPart={selectedPart}
                />
            </Suspense>
            {/* <CameraControls />*/}
            <OrbitControls
                maxPolarAngle={Math.PI / 2}
                autoRotate={spinning}
                onStart={() => pauseSpin()}
                onEnd={() => pauseSpin(RESUME_DELAY)}
                autoRotateSpeed={-1}
                maxDistance={30}
                minDistance={15}
                enablePan={false}
            />
        </>
    );
}

function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
        const aspect = size.width / size.height;

        camera.zoom = Math.min(1, Math.max(0.4, aspect * 1.3));
        camera.updateProjectionMatrix();
    }, [camera, size]);
    return null;
}
