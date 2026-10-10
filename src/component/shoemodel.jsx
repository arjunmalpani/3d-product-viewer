import { useCursor, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import * as THREE from "three";

const UPPERCOLOR = "1A1A1A";
const SOLECOLOR = "FFFFFF";
const PART_BY_MESH = {
    Trainers_Cube025_1: "upper",
    Trainers_Cube025_1_1: "sole",
};
export default function ShoeModel({
    upperColor,
    soleColor,
    onSelectPart,
    selectedPart,
}) {
    const [hoveredPart, setHoveredPart] = useState(null);
    useCursor(hoveredPart !== null);
    const { scene, materials } = useGLTF("/models/shoe.glb");
    const upperGoal = useMemo(() => new THREE.Color(upperColor), [upperColor]);
    const soleGoal = useMemo(() => new THREE.Color(soleColor), [soleColor]);
    useEffect(() => {
        [UPPERCOLOR, SOLECOLOR].forEach((key) => {
            materials[key].emissiveIntensity = 0;
        });
    }, [materials]);
    useFrame((_state, delta) => {
        const t = 1 - Math.exp(-8 * delta);
        materials[UPPERCOLOR].color.lerp(upperGoal, t);
        materials[SOLECOLOR].color.lerp(soleGoal, t);

        const glow = (mat, part) => {
            mat.emissive.copy(mat.color); // glow in the part's own colour
            const target = hoveredPart === part ? 0.3 : 0;
            mat.emissiveIntensity = THREE.MathUtils.lerp(
                mat.emissiveIntensity,
                target,
                t,
            );
        };
        glow(materials[UPPERCOLOR], "upper");
        glow(materials[SOLECOLOR], "sole");
    });
    const handleClick = (e) => {
        e.stopPropagation();
        const part = PART_BY_MESH[e.object.name];

        if (part) onSelectPart(part);
    };
    const handleOnPointerOver = (e) => {
        e.stopPropagation();
        setHoveredPart(PART_BY_MESH[e.object.name] ?? null);
    };
    const handleOnPointerOut = () => {
        setHoveredPart(null);
    };
    return (
        <primitive
            object={scene}
            onClick={handleClick}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
        />
    );
}

useGLTF.preload("/models/shoe.glb");
