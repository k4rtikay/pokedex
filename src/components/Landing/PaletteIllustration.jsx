import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./palette-illustration.scss";

/**
 * PaletteIllustration Component
 * Displays 6 vertical color ribbons with a Pokemon sprite overlay
 * Animates between different Pokemon with a synchronized grayscale transition
 * 
 * @param {Object[]} palettes - Array of palette objects
 * @param {string} palettes[].spriteUrl - URL of the Pokemon sprite
 * @param {string[]} palettes[].colors - Array of 6 hex color strings
 * @param {number} interval - Transition interval in ms (default: 3000)
 */
export default function PaletteIllustration({ palettes = [], interval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGrayscale, setIsGrayscale] = useState(false);

    useEffect(() => {
        if (palettes.length <= 1) return;

        const timer = setInterval(() => {
            setIsGrayscale(true);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % palettes.length);
            }, 600);

            setTimeout(() => {
                setIsGrayscale(false);
            }, 700);
        }, interval);

        return () => clearInterval(timer);
    }, [palettes.length, interval]);

    if (palettes.length === 0) return null;

    const currentPalette = palettes[currentIndex];

    return (
        <motion.div
            className="palette-illustration"
            animate={{
                filter: isGrayscale ? "grayscale(100%)" : "grayscale(0%)"
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className="color-ribbons">
                {currentPalette.colors.slice(0, 6).map((color, index) => (
                    <motion.div
                        key={`ribbon-${index}`}
                        className="ribbon"
                        animate={{ backgroundColor: color }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                ))}
            </div>

            <motion.div
                key={currentIndex}
                className="sprite-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <img
                    src={currentPalette.spriteUrl}
                    alt="Pokemon sprite"
                    className="pokemon-sprite"
                />
            </motion.div>
        </motion.div>
    );
}
