import { useState } from "react"
import { randomPokemonNumber } from "../../utils";
import './Pokecard.scss'
import './paletteButton.css'
import { Modal } from "../Modal/Modal";
import { ViewPalette } from "../palette/ViewPalette.jsx";
import { usePokedex } from "../../Context/PokedexContext.jsx";
import { usePokemonMove } from "../../hooks/usePokemonMove.js";
import SavedPaletteWindow from "../palette/SavedPaletteWindow.jsx";
import Export from "./Export.jsx";



export function Pokecard({selectedPokemon, setIsModalOpen, isModalOpen}){

    const { skill, loading: moveLoading, fetchMove } = usePokemonMove();

    const { data, description, loading, isPaletteModalOpen, setIsPaletteModalOpen, setSelectedPokemon, isGenerating, setIsGenerating, isShiny, setIsShiny, isLibraryOpen, setIsLibraryOpen, palette } = usePokedex();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [ showExportModal, setShowExportModal ] = useState(false)

    const { name } = data || {}

    const colorArray =  palette?.map((obj, objIndex)=>{
        return obj.color
    })

    return (

        <div className="pokecard">

            <Modal isModalOpen={showExportModal} onClose={()=>{setShowExportModal(false)}}>
                <Export colorArray={colorArray} name={name}></Export>
            </Modal>

            <SavedPaletteWindow></SavedPaletteWindow>
            <main>
                <ViewPalette
                isSaveModalOpen={isSaveModalOpen}
                setIsSaveModalOpen={setIsSaveModalOpen}></ViewPalette>
            </main>
            <footer className="pc-action">
                <button className="pc-action--primary"
                disabled={isGenerating}
                onClick={()=>{
                    setSelectedPokemon(randomPokemonNumber())
                    setIsGenerating(true)}}>Generate</button>
                <span className="secondary">
                    <button className="pc-action--secondary"
                    disabled={isGenerating}
                    onClick={()=>{
                        setIsShiny(!isShiny)}}>{!isShiny?<span className="material-symbols-rounded">star_shine</span>:<span className="material-symbols-rounded">circle</span>}</button>
                    <button className="pc-action--secondary" disabled={isGenerating}
                    onClick={()=>{setShowExportModal(!showExportModal)}}><span className="material-symbols-rounded">ios_share</span></button>
                    <button className="pc-action--secondary"
                    disabled={isGenerating}
                    onClick={()=>{setIsSaveModalOpen(true)}}><span className="material-symbols-rounded">favorite</span></button>
                    <button className="pc-action--secondary"
                    disabled={isGenerating}
                    onClick={()=>{setIsLibraryOpen(!isLibraryOpen)}}><span className="material-symbols-rounded">palette</span></button>
                </span>
            </footer>
        </div>
    )
}

