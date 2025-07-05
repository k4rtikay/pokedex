import { Header } from "../Header/Header";
import { Sidenav } from "../Sidenav/Sidenav";
import { Pokecard } from "../Pokecard/Pokecard";
import { useState } from "react";
import { animate, motion } from "framer-motion";

export default function MainAppLayout() {
    const [selectedPokemon, setSelectedPokemon] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);  

    const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false); 

    const [frontSprite, setFrontSprite] = useState(null);

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);


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
        }}>
            <div className='App'>
            <div className="sidePane">
            <Header isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen}/>
            <Sidenav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} isSideMenuOpen={isSideMenuOpen}/>
            </div>
            <Pokecard selectedPokemon={selectedPokemon}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            isPaletteModalOpen={isPaletteModalOpen}
            setIsPaletteModalOpen={setIsPaletteModalOpen}
            frontSprite={frontSprite}
            setFrontSprite={setFrontSprite} />
            </div>
        </motion.div>
    )

}