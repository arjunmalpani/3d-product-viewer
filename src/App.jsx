import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./component/scene";

function App() {
    return (
        <div className="h-screen w-screen">
            <Canvas camera={{ position: [10, 10, 14], fov: 50 }}>
                <Scene />
            </Canvas>
        </div>
    );
}

export default App;
