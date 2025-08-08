import { useState, useEffect, createContext, useContext } from "react";
import { usePokemon } from "../hooks/usePokemon";

const PokedexContext = createContext();

export function PokedexProvider({children}){
    const [selectedPokemon, setSelectedPokemon] = useState(0)
    const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false)
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
    const [savePalette, setSavePalette] = useState([])


    const { data, description, loading } = usePokemon(selectedPokemon)

    const value = {
        selectedPokemon,
        setSelectedPokemon,
        data,
        description,
        loading,
        frontSprite: data?.sprites?.front_default,
        isPaletteModalOpen,
        setIsPaletteModalOpen,
        setIsSideMenuOpen,
        isSideMenuOpen,
        savePalette,
        setSavePalette
    }

    return (
        <PokedexContext.Provider value={value}>
            {children}
        </PokedexContext.Provider>
    )

}

export function usePokedex(){
    return useContext(PokedexContext)
}