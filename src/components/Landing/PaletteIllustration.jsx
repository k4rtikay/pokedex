import { motion } from "framer-motion";
import "./palette-illustration.scss";
import { useDeviceContext } from "../../Context/DeviceContext";

export function PaletteIllustration({ palettes = [] }) {
    if (palettes.length === 0) return null;
    const { isDesktop } = useDeviceContext();

    const maxCards = isDesktop ? 6 : 4;

    // Calculate rotation and position for the arc
    // Spread 6 cards over an angle, e.g., -15 to +15 degrees
    const totalCards = Math.min(palettes.length, maxCards);
    const centerIndex = (totalCards - 1) / 2;
    const baseAngle = 6; // degrees per card
    const xOffset = 30; // px per card
    const yOffset = 10; // vertical arc offset

    return (
        <div className="palette-illustration-container">
            {palettes.slice(0, maxCards).map((palette, index) => {
                // Calculate properties for the "fanned out" state
                const offsetFromCenter = index - centerIndex;
                const rotate = offsetFromCenter * baseAngle;
                // Move cards slightly apart horizontally, but keep them overlapping
                const x = offsetFromCenter * xOffset;
                // Create an arc shape for Y (center cards higher)
                const y = Math.abs(offsetFromCenter) * yOffset;

                return (
                    <motion.div
                        key={index}
                        className="trading-card"
                        initial={{
                            rotate: 0,
                            x: 0,
                            y: 0,
                            scale: 0.95
                        }}
                        animate={{
                            rotate: rotate,
                            x: x,
                            y: y,
                            scale: 1,
                            transition: {
                                duration: 0.4,
                                delay: index * 0.1 + 0.2,
                                type: "spring",
                                stiffness: 100,
                                damping: 20
                            }
                        }}
                        whileHover={{
                            y: y - 40,
                            rotate: 0,
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }
                        }}
                        style={{
                            zIndex: index
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
                    </motion.div>
                );
            })}
        </div>
    );
}   