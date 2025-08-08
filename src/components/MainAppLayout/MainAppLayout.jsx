import { Header } from "../Header/Header";
import { Sidenav } from "../Sidenav/Sidenav";
import { Pokecard } from "../Pokecard/Pokecard";
import { useState } from "react";
import { animate, motion } from "framer-motion";
import { usePokedex } from "../../Context/PokedexContext";
import { PaletteModal } from "../palette/PaletteModal";
import { ViewPalette } from "../palette/ViewPalette";

export default function MainAppLayout() {
    const { selectedPokemon, setSelectedPokemon,isPaletteModalOpen, setIsPaletteModalOpen, isSideMenuOpen } = usePokedex();

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
        }}>
            <div className='App'>
                {/* <Header isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen}/> */}
                <div className="contentPane">
                    <Sidenav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} isSideMenuOpen={isSideMenuOpen}/>
                    <Pokecard selectedPokemon={selectedPokemon}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen} />
                </div>
                {(isPaletteModalOpen)&&(
                    <PaletteModal onClose={()=>{setIsPaletteModalOpen(false)}} isPaletteModalOpen={isPaletteModalOpen}>
                        <>
                        <ViewPalette></ViewPalette>
                        </>
                    </PaletteModal>
                )}
            </div>
        </motion.div>
    )

}