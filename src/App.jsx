import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./component/scene";
import { useState } from "react";
import SwatchRow from "./component/swatch-row";
import { soleColors, upperColors } from "./colors";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { useRef } from "react";
import { useEffect } from "react";

function App() {
    const [upperColor, setUpperColor] = useState("#1a1a1a");
    const [soleColor, setSoleColor] = useState("#ffffff");
    const [selected, setSelected] = useState("upper");
    const [spinning, setSpinning] = useState(true);
    const timer = useRef(null);

    const isUpper = selected === "upper";

    const upperName = upperColors.find((c) => upperColor === c.hex)?.name;
    const soleName = soleColors.find((c) => soleColor === c.hex)?.name;

    useEffect(() => () => clearTimeout(timer.current), []);

    const pauseSpin = (resumeAfter) => {
        clearTimeout(timer.current);
        setSpinning(false);
        if (resumeAfter) {
            timer.current = setTimeout(() => setSpinning(true), resumeAfter);
        }
    };
    return (
        <div className="relative h-screen w-screen">
            {/* title and product info*/}
            <div className="pointer-events-none absolute left-6 top-6 text-white sm:left-10 sm:top-10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    New collection
                </p>
                <h1 className="mt-1 text-4xl font-bold sm:text-6xl">
                    Aero Low
                </h1>
                <p className="mt-2 max-w-xs text-sm text-white/80">
                    Pick a part, pick a colour. Drag to rotate, scroll to zoom.
                </p>
                <p className="mt-4 text-2xl font-semibold">₹4,999</p>
                <p className="mt-1 text-sm text-white/70">
                    Upper: {upperName} · Sole: {soleName}
                </p>
            </div>
            {/* */}
            <Suspense>
                <Canvas
                    camera={{ position: [10, 10, 16], fov: 50 }}
                    dpr={[1, 1.5]}
                >
                    <Scene
                        upperColor={upperColor}
                        soleColor={soleColor}
                        onSelectPart={setSelected}
                        selectedPart={selected}
                        spinning={spinning}
                        pauseSpin={pauseSpin}
                    />
                </Canvas>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 space-x-4">
                    <SwatchRow
                        label={isUpper ? "Upper" : "Sole & Laces"}
                        colors={isUpper ? upperColors : soleColors}
                        value={isUpper ? upperColor : soleColor}
                        onChange={(hex) => {
                            pauseSpin(6000); // stay still while choosing colours
                            isUpper ? setUpperColor(hex) : setSoleColor(hex);
                        }}
                    />
                </div>
            </Suspense>
            {/* Credits */}
            <p className="absolute bottom-2 right-3 max-w-[60%] text-right text-xs leading-tight text-white/60">
                "Trainer" by Jeremy,{" "}
                <a
                    href="https://creativecommons.org/licenses/by/3.0/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-white"
                >
                    CC-BY 3.0
                </a>
                , via{" "}
                <a
                    href="https://poly.pizza/m/cs7k_ENAZjQ"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-white"
                >
                    Poly Pizza
                </a>
            </p>
            <Loader />
        </div>
    );
}

export default App;
