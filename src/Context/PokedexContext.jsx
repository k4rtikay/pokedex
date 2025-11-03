import { useState, useEffect, createContext, useContext } from "react";
import { usePokemon } from "../hooks/usePokemon";

const PokedexContext = createContext();

export function PokedexProvider({children}){
    const [selectedPokemon, setSelectedPokemon] = useState(0)
    const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false)
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true)
    const [palette, setPalette] = useState(null)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth>=1024)
    const [themeColor, setThemeColor] = useState([0,0,0])
    const [isGenerating, setIsGenerating] = useState(false)
    const [isShiny, setIsShiny] = useState(false)
    const [isLibraryOpen, setIsLibraryOpen] = useState(false)
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode)

    const { data, pokemonList, loading } = usePokemon(selectedPokemon)

    useEffect(()=>{
        const handleResize =()=>{
            setIsDesktop(window.innerWidth>=1024)
        }

        window.addEventListener('resize', handleResize)

        return (()=>{ window.removeEventListener('resize', handleResize)})
    },[])



    const value = {
        selectedPokemon,
        setSelectedPokemon,
        data,
        pokemonList,
        loading,
        isPaletteModalOpen,
        setIsPaletteModalOpen,
        setIsSideMenuOpen,
        isSideMenuOpen,
        palette,
        setPalette,
        isDesktop,
        themeColor,
        setThemeColor,
        isGenerating,
        setIsGenerating,
        isShiny,
        setIsShiny,
        isLibraryOpen,
        setIsLibraryOpen,
        isDarkMode,
        setIsDarkMode
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