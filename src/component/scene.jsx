import {
    CameraControls,
    ContactShadows,
    Environment,
    OrbitControls,
} from "@react-three/drei";
import { Suspense } from "react";
import ShoeModel from "./shoemodel";

export default function Scene({
    upperColor,
    soleColor,
    onSelectPart,
    selectedPart,
}) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <Environment preset="city" />
            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.6}
                scale={20}
                blur={2.5}
                far={6}
                resolution={512}
            />
            <Suspense>
                <ShoeModel
                    upperColor={upperColor}
                    soleColor={soleColor}
                    onSelectPart={onSelectPart}
                    selectedPart={selectedPart}
                />
            </Suspense>
            {/* <CameraControls />*/}
            <OrbitControls
                maxPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={-4}
                maxDistance={30}
                minDistance={10}
            />
        </>
    );
}
