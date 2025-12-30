import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./palette-illustration.scss";


export function usePaletteAnimation(palettes = [], interval = 3000) {
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

    return {
        currentIndex,
        isGrayscale,
        currentPalette: palettes[currentIndex]
    };
}


export function AnimatedColorsText({ text = "COLORS", currentPalette, isGrayscale }) {
    if (!currentPalette) return <span>{text}</span>;

    const letters = text.split("");
    const colors = currentPalette.colors;

    return (
        <span className="animated-colors-text" style={{ display: "inline-flex" }}>
            {letters.map((letter, i) => (
                <motion.span
                    key={`${i}-${currentPalette.spriteUrl}`}
                    initial={{ opacity: 0.8 }}
                    animate={{
                        color: colors[i % colors.length],
                        filter: isGrayscale ? "grayscale(100%) brightness(0.7)" : "grayscale(0%) brightness(1)",
                        opacity: 1
                    }}
                    transition={{ duration: 0.5 }}
                >
                    {letter}
                </motion.span>
            ))}
        </span>
    );
}

export function PaletteIllustration({
    palettes = [],
    interval = 3000,
    currentIndex: externalCurrentIndex,
    isGrayscale: externalIsGrayscale
}) {
    const isControlled = externalCurrentIndex !== undefined;
    const internalState = usePaletteAnimation(isControlled ? [] : palettes, interval);

    const currentIndex = isControlled ? externalCurrentIndex : internalState.currentIndex;
    const isGrayscale = isControlled ? externalIsGrayscale : internalState.isGrayscale;

    if (palettes.length === 0) return null;

    const currentPalette = palettes[currentIndex];

    if (!currentPalette) return null;

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
