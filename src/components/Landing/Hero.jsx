import "./hero.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import  { PaletteIllustration,usePaletteAnimation, AnimatedColorsText } from "./PaletteIllustration";

const samplePalettes = [
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        colors: ["#F8D030", "#A8A878", "#f86058ff", "#705848", "#a24b08", "#fcc840"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        colors: ["#082933", "#cc5444", "#ec963b", "#84341c", "#247494", "#cccccc"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
        colors: ["#A040A0", "#F8F8F8", "#705898", "#A8A8C0", "#483D8B", "#b2b2f7ff"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png",
        colors: ["#34405a", "#f3e38d", "#e82804", "#fcd004", "#5c7cbc", "#a48c4c"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
        colors: ["#6890F0", "#98D8D8", "#A8A8C0", "#705848", "#1c4454", "#dcc484"]
    }
];

export default function Hero() {
    const { currentIndex, isGrayscale, currentPalette } = usePaletteAnimation(samplePalettes, 3500);
    const navigate = useNavigate();

    return (
        <div className="hero">
            <div className="hero-content">
                <h1>
                    Iconic Pokémon <AnimatedColorsText text="Colors" currentPalette={currentPalette} isGrayscale={isGrayscale} />, <br /> Ready for Real Projects!
                </h1>
                <p>Design faster with color palettes inspired by Pokémon—crafted for designers and developers who want nostalgia and precision. Generate, lock, tweak, and export palettes in seconds.</p>
                <button
                onClick={() => {navigate("/app")}}
                >Start Creating</button>
            </div>
            <div className="hero-illustration">
                <PaletteIllustration
                    palettes={samplePalettes}
                    interval={3500}
                    currentIndex={currentIndex}
                    isGrayscale={isGrayscale}
                />
            </div>
        </div>
    )
}