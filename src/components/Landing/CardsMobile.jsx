import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import './cards-mobile.scss';


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
        name: "Sceptile",
        id: "#254",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/254.png",
        colors: ["#4E8234", "#78C850", "#1B4D1B", "#C03028", "#F8D030", "#A8D8A0"],
        config: {
            y: -20,
            x: 300,
            zIndex: 3,
            rotate: -2,
        }
    },
    {
        name: "Lapras",
        id: "#131",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
        colors: ["#6890F0", "#98D8D8", "#A8A8C0", "#705848", "#1c4454", "#dcc484"],
        config: {
            y: 20,
            x: 600,
            zIndex: 6,
            rotate: 8,
        }
    }
];


function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_, info) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    if (disableDrag) {
        return (
            <motion.div className="mobile-card-rotate-disabled" style={{ x: 0, y: 0 }}>
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="mobile-card-rotate"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

export default function Stack({
    randomRotation = false,
    sensitivity = 200,
    cards = palettes,
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    mobileClickOnly = false,
    mobileBreakpoint = 768
}) {
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    const shouldDisableDrag = mobileClickOnly && isMobile;
    const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

    const [stack, setStack] = useState(() => {
        if (cards.length) {
            return cards.map((content, index) => ({ id: index + 1, content }));
        } else {
            return [
                {
                    id: 1,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
                            alt="card-1"
                            className="card-image"
                        />
                    )
                },
                {
                    id: 2,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
                            alt="card-2"
                            className="card-image"
                        />
                    )
                },
                {
                    id: 3,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
                            alt="card-3"
                            className="card-image"
                        />
                    )
                },
                {
                    id: 4,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
                            alt="card-4"
                            className="card-image"
                        />
                    )
                }
            ];
        }
    });

    useEffect(() => {
        if (cards.length) {
            setStack(cards.map((content, index) => ({ id: index + 1, content })));
        }
    }, [cards]);

    const sendToBack = id => {
        setStack(prev => {
            const newStack = [...prev];
            const index = newStack.findIndex(card => card.id === id);
            const [card] = newStack.splice(index, 1);
            newStack.unshift(card);
            return newStack;
        });
    };

    useEffect(() => {
        if (autoplay && stack.length > 1 && !isPaused) {
            const interval = setInterval(() => {
                const topCardId = stack[stack.length - 1].id;
                sendToBack(topCardId);
            }, autoplayDelay);

            return () => clearInterval(interval);
        }
    }, [autoplay, autoplayDelay, stack, isPaused]);

    return (
        <div
            className="mobile-stack-container"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            {stack.map((card, index) => {
                const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
                return (
                    <CardRotate
                        key={card.id}
                        onSendToBack={() => sendToBack(card.id)}
                        sensitivity={sensitivity}
                        disableDrag={shouldDisableDrag}
                    >

                        <motion.div
                            className="mobile-card"
                            onClick={() => shouldEnableClick && sendToBack(card.id)}
                            animate={{
                                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                                scale: 1 + index * 0.06 - stack.length * 0.06,
                                transformOrigin: '90% 90%'
                            }}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping
                            }}
                        >
                            <div className="mobile-card-content">
                                <div className="mobile-pokemon-info">
                                    <span className="mobile-pokemon-name">{card.content.name}</span>
                                    <span className="mobile-pokemon-id">{card.content.id}</span>
                                </div>

                                <div className="mobile-trading-card-img">
                                    <div className="mobile-sprite-container">
                                        <img
                                            src={card.content.spriteUrl}
                                            alt={card.content.name}
                                            className="mobile-pokemon-sprite"
                                        />
                                    </div>

                                    <div className="mobile-card-background">
                                        {card.content.colors && card.content.colors.slice(0, 6).map((color, i) => (
                                            <div key={i} className="mobile-ribbon" style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </CardRotate>
                );
            })}
        </div>
    );
}
