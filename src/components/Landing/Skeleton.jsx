import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Folder, Code as CodeIcon, Sparkles } from "lucide-react";
import "./skeleton.scss";

export function LockSkeleton() {
    const [isLocked, setIsLocked] = useState(true);
    const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEEAD",
        "#D4A5A5",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLocked((prev) => !prev);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Grid items for background
    const gridItems = Array.from({ length: 48 });

    return (
        <div className="lock-skeleton">
            <div className="swatch-grid">
                {gridItems.map((_, index) => (
                    <motion.div
                        key={index}
                        className="grid-swatch"
                        initial={{ backgroundColor: colors[index % colors.length], opacity: 0.5 }}
                        animate={{
                            backgroundColor: isLocked
                                ? colors[index % colors.length] // Frozen when locked
                                : [
                                    colors[index % colors.length],
                                    colors[(index + 1) % colors.length],
                                    colors[index % colors.length],
                                ],
                            scale: isLocked ? 1 : [1, 0.9, 1], // Pulse when unlocked
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.05,
                        }}
                    />
                ))}
            </div>

            <div className="icon-container">
                <AnimatePresence mode="wait">
                    {isLocked ? (
                        <motion.div
                            key="lock"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Lock className="main-icon" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unlock"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Unlock className="main-icon" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export function SaveSkeleton() {
    const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEEAD",
        "#D4A5A5",
    ];

    // Generate enough items to fill the grid loosely
    const gridItems = Array.from({ length: 48 });

    return (
        <div className="save-skeleton">
            <div className="swatch-grid">
                {gridItems.map((_, index) => (
                    <motion.div
                        key={index}
                        className="grid-swatch"
                        initial={{ backgroundColor: colors[index % colors.length] }}
                        animate={{
                            backgroundColor: [
                                colors[index % colors.length],
                                colors[(index + 1) % colors.length],
                                colors[(index + 2) % colors.length],
                                colors[index % colors.length],
                            ],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2, // Randomize duration slightly
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="folder-container">
                <Folder className="folder-icon" />
            </div>
        </div>
    );
}

export function ExportSkeleton() {
    const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEEAD",
        "#D4A5A5",
    ];

    // Create lines of mock code
    const codeLines = Array.from({ length: 20 });

    return (
        <div className="export-skeleton">
            <div className="code-background">
                {codeLines.map((_, i) => (
                    <div key={i} className="code-line" style={{
                        marginLeft: `${Math.random() * 20}%`,
                        width: `${Math.random() * 40 + 40}%`
                    }}>
                        <div className="code-indents">
                            {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, j) => (
                                <motion.div
                                    key={j}
                                    className="code-token"
                                    style={{
                                        width: `${Math.random() * 30 + 20}px`,
                                        backgroundColor: "#e5e7eb"
                                    }}
                                    animate={{
                                        backgroundColor: [
                                            "#e5e7eb", // gray-200
                                            colors[(i + j) % colors.length],
                                            "#e5e7eb"
                                        ]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.1 + j * 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="icon-container">
                <CodeIcon className="main-icon" />
            </div>
        </div>
    );
}

export function ShinySkeleton() {
    const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEEAD",
        "#D4A5A5",
    ];

    const particles = Array.from({ length: 35 });

    return (
        <div className="shiny-skeleton">
            <div className="particles-container">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: colors[i % colors.length],
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="icon-container">
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Sparkles className="main-icon" />
                </motion.div>
            </div>
        </div>
    );
}