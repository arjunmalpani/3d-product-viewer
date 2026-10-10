import { useCursor, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import * as THREE from "three";
const DELAY = 0.5;
const DURATION = 1.4;

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
}) {
    const [hoveredPart, setHoveredPart] = useState(null);
    useCursor(hoveredPart !== null);

    const group = useRef();
    const age = useRef(0);
    const { scene, materials } = useGLTF("/models/shoe.glb");
    const upperGoal = useMemo(() => new THREE.Color(upperColor), [upperColor]);
    const soleGoal = useMemo(() => new THREE.Color(soleColor), [soleColor]);
    useEffect(() => {
        [UPPERCOLOR, SOLECOLOR].forEach((key) => {
            materials[key].emissiveIntensity = 0;
        });
    }, [materials]);
    useFrame((_state, delta) => {
        age.current += delta;
        // progress 0 to 1
        const p = THREE.MathUtils.clamp((age.current - DELAY) / DURATION, 0, 1);
        const e = 1 - Math.pow(1 - p, 3); // cubic ease

        group.current.scale.setScalar(Math.max(e, 0.001));
        group.current.position.y = (1 - e) * 1.5;
        group.current.rotation.y = (1 - e) * Math.PI;

        const t = 1 - Math.exp(-8 * delta);

        materials[UPPERCOLOR].color.lerp(upperGoal, t);
        materials[SOLECOLOR].color.lerp(soleGoal, t);

        const glow = (mat, part) => {
            mat.emissive.copy(mat.color); // glow in the part's own colour
            const target = hoveredPart === part ? -0.3 : 0;
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
        <group ref={group}>
            <primitive
                object={scene}
                onClick={handleClick}
                onPointerOver={handleOnPointerOver}
                onPointerOut={handleOnPointerOut}
            />
        </group>
    );
}

useGLTF.preload("/models/shoe.glb");
