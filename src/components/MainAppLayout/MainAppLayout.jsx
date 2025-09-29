import { Header } from "../Header/Header";
import { Sidenav } from "../Sidenav/Sidenav";
import { Pokecard } from "../Pokecard/Pokecard";
import { useState } from "react";
import { animate, motion } from "framer-motion";
import { usePokedex } from "../../Context/PokedexContext";
import { PaletteModal } from "../palette/PaletteModal";
import { ViewPalette } from "../palette/ViewPalette";
import './MainAppLayout.scss'
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import useTheme from "../../hooks/usePokemonTheme";

export default function MainAppLayout() {
    const { selectedPokemon, setSelectedPokemon,isPaletteModalOpen, setIsPaletteModalOpen, isSideMenuOpen, isDesktop, themeColor } = usePokedex();

    const [isModalOpen, setIsModalOpen] = useState(false); 


    //const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
    

    return(
        <motion.div
        initial={{
            opacity: 0.3,
            filter: "blur(10px)"
        }}
        animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition:{
                type: 'spring',
                stiffness: 120,
                damping: 25
            }
        }
        }
        exit={{
            opacity: 0.3,
            filter: "blur(5px)",            
        }}
        style={{flexGrow:'1', display: 'flex', flexDirection: 'column'}}>
            <div className='app'>
                {isDesktop?<DesktopLayout/>:<MobileLayout/>}
                {/* <Pokecard selectedPokemon={selectedPokemon}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen} /> */}
            </div>
        </motion.div>
    )

}