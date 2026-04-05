import { motion } from "framer-motion";
import "./palette-illustration.scss";
import { useDeviceContext } from "../../Context/DeviceContext";
import { useState, useRef } from "react";
import { useEffect } from "react";

const palettes = [
    {
        name: "Pikachu",
        id: "#025",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        colors: ["#F8D030", "#A8A878", "#f86058ff", "#705848", "#a24b08", "#fcc840"],
        config: {
            y: -20,
            x: 0,
            zIndex: 1,
            rotate: -8,
        }
    },
    {
        name: "Charizard",
        id: "#006",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        colors: ["#082933", "#cc5444", "#ec963b", "#84341c", "#247494", "#cccccc"],
        config: {
            y: 28,
            x: 100,
            zIndex: 2,
            rotate: 5,
        }
    },
    {
        name: "Mewtwo",
        id: "#150",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
        colors: ["#A040A0", "#F8F8F8", "#705898", "#A8A8C0", "#483D8B", "#b2b2f7ff"],
        config: {
            y: -20,
            x: 300,
            zIndex: 3,
            rotate: -2,
        }
    },
    {
        name: "Typhlosion",
        id: "#157",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png",
        colors: ["#34405a", "#f3e38d", "#e82804", "#fcd004", "#5c7cbc", "#a48c4c"],
        config: {
            y: 28,
            x: 420,
            zIndex: 4,
            rotate: 5,
        }
    },
    {
        name: "Lapras",
        id: "#131",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
        colors: ["#6890F0", "#98D8D8", "#A8A8C0", "#705848", "#1c4454", "#dcc484"],
        config: {
            y: 20,
            x: 640,
            zIndex: 5,
            rotate: 8,
        }
    }
];

export function PaletteIllustration() {
    const { isDesktop } = useDeviceContext();
    const [active, setActive] = useState(null);

    const ref = useRef(null);

    useEffect(()=>{
        const handleOutsideClick = (e)=>{
            if(ref.current && !ref.current.contains(e.target)){
                setActive(null);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return ()=>{
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        
    },[])


    const maxCards = isDesktop ? 6 : 4;

    // Center the card group: offset so the midpoint of the spread aligns with the container center
    const cardWidth = 240;
    const visiblePalettes = palettes.slice(0, maxCards);
    const maxX = Math.max(...visiblePalettes.map(p => p.config.x));
    const centerOffset = -(maxX + cardWidth) / 2;

    const isAnyCardActive = () =>{
        return active?.name
    }

    const isCurrentCardActive = (palette) => {
        return active?.name === palette.name
    }

    return (
        <div className="palette-illustration-container">
            {visiblePalettes.map((palette, index) => (
                <motion.button
                    ref={ref}
                    onClick={()=>{setActive(palette)}}
                    key={palette.name}
                    className="trading-card"
                    initial = {{
                        y: 400,
                        x: 0,
                        scale: 0,
                        filter: "blur(10px)",
                    }}
                    animate={{
                        y: isCurrentCardActive(palette) ? 0 : (isAnyCardActive() ?  300 : palette.config.y),
                        x: isCurrentCardActive(palette) ? 320 : (isAnyCardActive() ?  palette.config.x * 0.6 - 266 : palette.config.x + centerOffset),
                        zIndex: palette.config.zIndex,
                        rotate: isCurrentCardActive(palette) ? 0 : (isAnyCardActive() ? palette.config.rotate*0.2 : palette.config.rotate),
                        scale: isCurrentCardActive(palette) ? 1 : (isAnyCardActive() ? 0.7 : 1),
                        width: isCurrentCardActive(palette) ? 360 : cardWidth,
                        height: isCurrentCardActive(palette) ? 480 : 360,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                    }}
                    whileHover={{scale: isCurrentCardActive(palette) ? 1 : (isAnyCardActive() ? 0.7 : 1.02)}}
                    style={{
                        zIndex: active?.config.zIndex,
                    }}
                >
                    <div className="card-content">
                        <div className="pokemon-info">
                            <span className="pokemon-name">{palette.name}</span>
                            <span className="pokemon-id">{palette.id}</span>
                        </div>

                        <div className="trading-card-img">
                            <div className="sprite-container">
                                <img
                                    src={palette.spriteUrl}
                                    alt={palette.name}
                                    className="pokemon-sprite"
                                />
                            </div>

                            <div className="card-background">
                                {palette.colors.slice(0, 6).map((color, i) => (
                                    <div key={i} className="ribbon" style={{ backgroundColor: color }} />
                                ))}
                            </div>

                            <div className="color-codes">
                                {palette.colors.slice(0, 6).map((color, i) => (
                                    <div key={i} className="hex-code">
                                        <span style={{ color: color }}>{color}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.button>
            ))}
        </div>
    );
}