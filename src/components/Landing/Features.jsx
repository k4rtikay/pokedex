import "./features.scss";
import { LockSkeleton, SaveSkeleton, ExportSkeleton, ShinySkeleton } from "./Skeleton";

const Skeleton = () => <div className="w-full h-full bg-gray-100 rounded-xl" />;


const features = [
    {
        heading: "Palette Locking & Shades Generation",
        description: "Freeze your favorite colors while generating new variations around them. Instantly explore lighter and darker shades to fine-tune contrast, depth, and accessibility.",
        skeleton: <LockSkeleton />
    },
    {
        heading: "Your Palettes, Perfectly Organized.",
        description: "Save, edit, and reuse palettes across projects. Manage multiple color sets without losing track—designed for fast iteration and long-term use.",
        skeleton: <SaveSkeleton />
    },
    {
        heading: "Design Once. Use Everywhere.",
        description: "Export palettes in production-ready formats like HEX, RGB, and CSS variables. Drop them straight into your design files or codebase.",
        skeleton: <ExportSkeleton />
    },
    {
        heading: "Built for Pokémon Fans. Designed for Creators.",
        description: "Instantly toggle between normal and shiny variants to unlock alternate color schemes, preview palettes alongside animated Pokémon sprites upto Gen V",
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