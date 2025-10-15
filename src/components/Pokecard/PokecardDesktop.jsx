import { usePokedex } from "../../Context/PokedexContext.jsx";
import { ViewPalette } from "../palette/ViewPalette.jsx";
import { useState } from "react";
import SavedPaletteWindow from "../palette/SavedPaletteWindow.jsx";
import Tooltip from "../Tooltip/Tooltip";

export default function PokecardDesktop(){

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const {isShiny, setIsShiny, isGenerating } = usePokedex()

    return(
        <div className="pokecard">
            {/* <SavedPaletteWindow isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen}></SavedPaletteWindow> */}
            <header>
                
            </header>
            <main>
                <SavedPaletteWindow></SavedPaletteWindow>
                <ViewPalette
                isSaveModalOpen={isSaveModalOpen}
                setIsSaveModalOpen={setIsSaveModalOpen}></ViewPalette>
            </main>
            <div className="pc-action">

                <span className="secondary">
  
                    <Tooltip text="Toggle Shiny">
                        <button className="pc-action--secondary"
                        disabled={isGenerating}
                        onClick={()=>{setIsShiny(!isShiny)}}>{!isShiny?<span className="material-symbols-rounded">star_shine</span>:<span className="material-symbols-rounded">circle</span>}
                        </button>
                    </Tooltip>

                    <Tooltip text="Export Palette (Coming soon!)">
                        <button className="pc-action--secondary" disabled={isGenerating}><span className="material-symbols-rounded">ios_share</span></button>
                    </Tooltip>

                    <Tooltip text="Save Palette">
                        <button className="pc-action--secondary"
                        disabled={isGenerating}
                        onClick={()=>{setIsSaveModalOpen(true)}}><span className="material-symbols-rounded">favorite</span>
                        </button>
                    </Tooltip>

                </span>
            </div>
        </div>
    )
}