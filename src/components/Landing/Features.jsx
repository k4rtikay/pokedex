import "./features.scss";
import { LockSkeleton, SaveSkeleton, ExportSkeleton, ShinySkeleton } from "./Skeleton";
import { motion } from "framer-motion";


const features = [
    {
        heading: "Palette Locking & Shades Generation",
        description: "Freeze your favorite colors. Instantly explore lighter and darker shades.",
        skeleton: <LockSkeleton />
    },
    {
        heading: "Your Palettes, Perfectly Organized.",
        description: "Save, edit, and reuse palettes across projects. Manage multiple color sets without losing track.",
        skeleton: <SaveSkeleton />
    },
    {
        heading: "Design Once. Use Everywhere.",
        description: "Export palettes in production-ready formats like HEX, RGB, and CSS variables.",
        skeleton: <ExportSkeleton />
    },
    {
        heading: "Built for Pokémon Fans. Designed for Creators.",
        description: "Toggle between normal and shiny variant colors, with animated Pokémon sprites upto Gen V",
        skeleton: <ShinySkeleton />
    }

]

const parentVariants = {
    hidden: {
        // opacity: 0,
    },
    visible: {
        // opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
}

const childVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 20
        }
    }
}

const skeletonVariants = {
    hidden: { 
        scale: 0.95 
    },
    visible: { 
        scale: 1,
        transition: { 
            delay: 0.5, 
            duration: 0.2 
        }
    }
}


export function Features() {
    return (
        <motion.div className="features"
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    className="feature"
                    variants={childVariants}
                >
                    <motion.div className="feature-skeleton" 
                    variants={skeletonVariants}
                    >
                        {feature.skeleton}
                    </motion.div>
                    <h3>{feature.heading}</h3>
                    <p>{feature.description}</p>
                </motion.div>
            ))}
        </motion.div>
    )
}