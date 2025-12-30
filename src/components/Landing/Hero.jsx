import "./hero.scss";
import { motion } from "framer-motion";
import  { PaletteIllustration,usePaletteAnimation, AnimatedColorsText } from "./PaletteIllustration";

const samplePalettes = [
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        colors: ["#F8D030", "#A8A878", "#F85888", "#705848", "#78C850", "#f82525ff"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        colors: ["#F08030", "#F8D030", "#78C850", "#6890F0", "#705848", "#A8A8C0"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
        colors: ["#A040A0", "#F8F8F8", "#705898", "#A8A8C0", "#483D8B", "#b2b2f7ff"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
        colors: ["#705898", "#F85888", "#A040A0", "#1A1A1A", "#483D8B", "#FFFFFF"]
    },
    {
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
        colors: ["#6890F0", "#98D8D8", "#A8A8C0", "#705848", "#78C850", "#F8F8F8"]
    }
];

export default function Hero() {
    const { currentIndex, isGrayscale, currentPalette } = usePaletteAnimation(samplePalettes, 3500);

    return (
        <div className="hero">
            <div className="hero-content">
                <h1>
                    Iconic <span>Pokémon</span> <AnimatedColorsText text="Colors" currentPalette={currentPalette} isGrayscale={isGrayscale} />, <br /> Ready for Real Projects!
                </h1>
                <p>Design faster with color palettes inspired by Pokémon—crafted for designers and developers who want nostalgia and precision. Generate, lock, tweak, and export palettes in seconds.</p>
                <button>Start Creating</button>
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