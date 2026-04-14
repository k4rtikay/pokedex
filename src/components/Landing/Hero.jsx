import "./hero.scss";
import { useNavigate } from "react-router-dom";
import { PaletteIllustration } from "./PaletteIllustration";
import { useDeviceContext } from "../../Context/DeviceContext";
import Stack from "./CardsMobile";

export default function Hero() {
    const navigate = useNavigate();
    const { isDesktop } = useDeviceContext();

    return (
        <div className="hero">
            <div className="hero-content">
                <h1>
                    Iconic Pokémon Colors <br /> Ready for Real Projects!
                </h1>
                <p>Design faster with color palettes inspired by Pokémon — Generate, lock, tweak, and export palettes in seconds.</p>
                <button
                    onClick={() => { navigate("/app") }}
                >Start Creating</button>
            </div>
            <div className="hero-illustration">
                {isDesktop ? (
                    <PaletteIllustration />
                ) : (
                    <Stack />
                )}
            </div>
        </div>
    )
}