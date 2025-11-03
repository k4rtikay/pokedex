import { usePokedex } from "../../Context/PokedexContext.jsx";
import { ViewPalette } from "../palette/ViewPalette.jsx";
import { useState } from "react";
import SavedPaletteWindow from "../palette/SavedPaletteWindow.jsx";
import Tooltip from "../Tooltip/Tooltip";
import { Modal } from "../Modal/Modal.jsx";
import Export from "./Export.jsx";

export default function PokecardDesktop(){

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const {isShiny, setIsShiny, isGenerating, palette, data } = usePokedex()
    const { name } = data
    const [ showExportModal, setShowExportModal ] = useState(false)

    const colorArray =  palette?.map((obj, objIndex)=>{
        return obj.color
    })

    return(
        <div className="pokecard">
            {/* <SavedPaletteWindow isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen}></SavedPaletteWindow> */}
            <header>
                
            </header>
            <main>
                <Modal isModalOpen={showExportModal} onClose={()=>{setShowExportModal(false)}}>
                    <Export colorArray={colorArray} name={name}></Export>
                </Modal>
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

                    <Tooltip text="Export Palette">
                        <button className="pc-action--secondary" disabled={isGenerating}
                        onClick={()=>{setShowExportModal(!showExportModal)}}><span className="material-symbols-rounded">ios_share</span></button>
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