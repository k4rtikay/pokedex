import { ViewPalette } from "../palette/ViewPalette.jsx";
import { useState } from "react";

export default function PokecardDesktop(){

    const [isShiny, setIsShiny] = useState(false)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

    return(
        <div className="pokecard">
            {/* <SavedPaletteWindow isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen}></SavedPaletteWindow> */}
            <header>
                
            </header>
            <main>
                <ViewPalette shiny={isShiny}
                isSaveModalOpen={isSaveModalOpen}
                setIsSaveModalOpen={setIsSaveModalOpen}></ViewPalette>
            </main>
            <div className="pc-action">
                {/* <button className="pc-action--primary"
                onClick={()=>{setSelectedPokemon(randomPokemonNumber())}}>Generate</button> */}
                <span className="secondary">
                    <button className="pc-action--secondary"
                    onClick={()=>{setIsShiny(!isShiny)}}><span className="material-symbols-rounded">star_shine</span></button>
                    <button className="pc-action--secondary"><span className="material-symbols-rounded">ios_share</span></button>
                    <button className="pc-action--secondary"
                    onClick={()=>{setIsSaveModalOpen(true)}}><span className="material-symbols-rounded">favorite</span></button>
                    {/* <button className="pc-action--secondary"
                    onClick={()=>{setIsLibraryOpen(!isLibraryOpen)}}><span className="material-symbols-rounded">palette</span></button> */}
                </span>
            </div>
        </div>
    )
}