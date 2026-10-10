import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./component/scene";
import { useState } from "react";
import SwatchRow from "./component/swatch-row";
import { soleColors, upperColors } from "./colors";

const swatches = ["#1a1a1a", "#e63946", "#2a9d8f", "#264653", "#f4a261"];

function App() {
    const [upperColor, setUpperColor] = useState("#1a1a1a");
    const [soleColor, setSoleColor] = useState("#ffffff");
    const [selected, setSelected] = useState("upper");
    const isUpper = selected === "upper";
    return (
        <div className="relative h-screen w-screen">
            <Canvas camera={{ position: [10, 10, 14], fov: 50 }}>
                <Scene
                    upperColor={upperColor}
                    soleColor={soleColor}
                    onSelectPart={setSelected}
                    selectedPart={selected}
                />
            </Canvas>
            <div className="absolute bottom-6 left-0 translate-x-1/2 -translate-y-1/2 space-x-4">
                <SwatchRow
                    label={isUpper ? "Upper" : "Sole & Laces"}
                    colors={isUpper ? upperColors : soleColors}
                    value={isUpper ? upperColor : soleColor}
                    onChange={isUpper ? setUpperColor : setSoleColor}
                />
            </div>
        </div>
    );
}

export default App;
