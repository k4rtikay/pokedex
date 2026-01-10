import "./hero.scss";
import { useNavigate } from "react-router-dom";
import { PaletteIllustration } from "./PaletteIllustration";

const samplePalettes = [
    {
        name: "Pikachu",
        id: "#025",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        colors: ["#F8D030", "#A8A878", "#f86058ff", "#705848", "#a24b08", "#fcc840"]
    },
    {
        name: "Charizard",
        id: "#006",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        colors: ["#082933", "#cc5444", "#ec963b", "#84341c", "#247494", "#cccccc"]
    },
    {
        name: "Mewtwo",
        id: "#150",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
        colors: ["#A040A0", "#F8F8F8", "#705898", "#A8A8C0", "#483D8B", "#b2b2f7ff"]
    },
    {
        name: "Typhlosion",
        id: "#157",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png",
        colors: ["#34405a", "#f3e38d", "#e82804", "#fcd004", "#5c7cbc", "#a48c4c"]
    },
    {
        name: "Lapras",
        id: "#131",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
        colors: ["#6890F0", "#98D8D8", "#A8A8C0", "#705848", "#1c4454", "#dcc484"]
    }
];

export default function Hero() {
    const navigate = useNavigate();

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
                <PaletteIllustration
                    palettes={samplePalettes}
                />
            </div>
        </div>
    )
}