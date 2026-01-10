import "./features.scss";
import { LockSkeleton, SaveSkeleton, ExportSkeleton, ShinySkeleton } from "./Skeleton";


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


export function Features() {
    return (
        <div className="features">
            {features.map((feature, index) => (
                <div key={index} className="feature">
                    <div className="feature-skeleton">{feature.skeleton}</div>
                    <h3>{feature.heading}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </div>
    )
}