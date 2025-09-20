import { useState } from "react"
import { getFullPokedexNumber, randomPokemonNumber } from "../../utils";
import { Typecard } from "../Typecard/Typecard";
import './Pokecard.scss'
import './paletteButton.css'
import { Modal } from "../Modal/Modal";
import { ViewPalette } from "../palette/ViewPalette.jsx";
import {PaletteModal} from "../palette/PaletteModal"
import { usePokedex } from "../../Context/PokedexContext.jsx";
import { usePokemonMove } from "../../hooks/usePokemonMove.js";
import SavedPaletteWindow from "../palette/SavedPaletteWindow.jsx";


export function Pokecard({selectedPokemon, setIsModalOpen, isModalOpen}){

    const { skill, loading: moveLoading, fetchMove } = usePokemonMove();
    // const [moveLoading, setMoveLoading]=useState(false)

    const { data, description, loading, isPaletteModalOpen, setIsPaletteModalOpen, setSelectedPokemon } = usePokedex();
    const [isShiny, setIsShiny] = useState(false)
    const [isLibraryOpen, setIsLibraryOpen] = useState(false)

    const { name, height, weight, abilities, stats, types, moves, sprites } = data || {}

    function heightInFeet(hght){
        const totalInches = hght*3.937
        const feet = Math.floor(totalInches/12)
        const inch = Math.round(totalInches%12)
        return `${feet}'${inch}"`
    }

    // async function fetchPokemonMove(move, moveUrl){

    //     if(moveLoading||!localStorage||!moveUrl) return

    //     setSkill(null)

    //     let moveCache={}

    //     if(localStorage.getItem('poke-moves')){
    //         moveCache=JSON.parse(localStorage.getItem('poke-moves'))
    //     }

    //     if(move in moveCache){
    //         setSkill(moveCache[move])
    //         console.log('move found in cache')
    //         setIsModalOpen(true);
    //         return
    //     }

    //     try{
    //         setMoveLoading(true)
    //         const moveRes = await fetch(moveUrl)
    //         const moveData = await moveRes.json()

    //         const description = moveData?.flavor_text_entries.filter(val => {
    //             return val.version_group.name == 'firered-leafgreen'
    //         })[0]?.flavor_text

    //         const {name, accuracy, power, pp} = moveData

    //         const skillData= {
    //             name: name,
    //             accuracy: accuracy,
    //             power: power,
    //             pp: pp,
    //             description: description
    //         }

    //         moveCache[move]=skillData
    //         localStorage.setItem('poke-moves', JSON.stringify(moveCache))
    //         setSkill(skillData)

    //         setIsModalOpen(true);
 
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    //     finally{
    //         setMoveLoading(false)
    //     }
    // }

    if(loading||!data){
        return(
            <div
            className="loading-div">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon+1}.png`} alt="silhoutte of a pokemon" />
            </div>
        )
    }

    const { back_default,back_shiny,front_default,front_shiny } = sprites

    // console.log(isShiny)

    return (
        // <div className="pokeEntry">
        //     {(isModalOpen)&&(
        //         <Modal onClose={()=>{setIsModalOpen(false)}} isModalOpen={isModalOpen}>
        //             {skill?
        //             <>
        //                 <div className="moveInfo">
        //                     <h3>{skill.name.replaceAll('-',' ').toUpperCase()}</h3>
        //                     <h4>Description:</h4>
        //                     <p>{skill.description}</p>
        //                     <h4>Stats:</h4>
        //                     <ul>
        //                         <li>Accuracy: {skill.accuracy?skill.accuracy:'---'}</li>
        //                         <li>Power: {skill.power?skill.power:'---'}</li>
        //                         <li>PP: {skill.pp}</li>
        //                     </ul>
        //                 </div>
        //                 <img src="pokemmo-svgrepo-com(1).svg" alt="Pokeball-icon" className="pokeballIcon"/>
        //             </> : (<div className="loading-div">Loading....</div>)
        //             }
        //         </Modal>
        //     )}



        //     <div className="pokeImage">
        //         <div className="pokeImgHeader">
        //             <div className="pokeName">
        //                 <p>{getFullPokedexNumber(selectedPokemon)}</p>
        //                 <p>{name.toUpperCase()}</p>
        //             </div>
        //             <button className="btn-61"
        //             onClick={()=>{setIsPaletteModalOpen(true)}}><span>Scan for Colors!</span></button>
        //         </div>
        //         <div className="typeContainer">
        //             {
        //             types.map((typeObj, typeIndex)=>{
        //                 return <Typecard key ={typeIndex} type={typeObj?.type?.name}/>
        //             })
        //             }
        //         </div>
        //         <div className="pokeImgContent">
        //             <img className="default-img" src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`} alt={`${name}-big-image`}/>
        //             <div className="sprites-container">
        //                     <img src={back_default} alt={`Back-sprite-of-${name}`} className="poke-sprite" />
        //                     <img src={front_default} alt={`Front-sprite-of-${name}`} className="poke-sprite" />
        //                     <img src={back_shiny} alt={`shiny-back-sprite-of-${name}`} className="poke-sprite" />
        //                     <img src={front_shiny} alt={`shiny-front-sprite-of-${name}`} className="poke-sprite" />
        //             </div>
        //         </div>
        //         <div className="pokeDes">
        //             <p style={{margin:'0'}}>{description}</p>
        //         </div>
        //     </div>



        //     <div className="pokeData">
        //             <div className="data">
        //                 <span style={{color:'var(--pokemon-entry-secondary-color)',marginBottom:'7px'}}>Height:</span> <span style={{marginBottom:'7px'}}>{heightInFeet(height) }</span>
        //                 <span style={{color:'var(--pokemon-entry-secondary-color)',marginBottom:'7px'}}>Weight:</span> <span style={{marginBottom:'7px'}}>{(weight*0.220462).toFixed(1)} lbs</span>
        //                 <div className="abilites">
        //                     <span style={{color:'var(--pokemon-entry-secondary-color)'}}>Abilities:</span>
        //                     <ul>{abilities.map((ability, abilityIndex)=>{
        //                         return <li key={abilityIndex}>{ability?.ability?.name}</li>
        //                     })}</ul>
        //                 </div>
        //                 <div className="stats">
        //                     <span style={{color:'var(--pokemon-entry-secondary-color)'}}>Stats:</span>
        //                     <ul>{
        //                         stats.map((stat,statIndex)=>{
        //                             return <li key={statIndex}>{stat?.stat?.name}: {stat.base_stat}</li>
        //                         })
        //                     }</ul>
        //                 </div>
        //             </div>
        //             <div className="moveSet">
        //                 <span style={{color:'var(--pokemon-entry-secondary-color)',marginBottom:'7px'}}>Moves:</span>
        //                 {
        //                     moves.map((moveObj, moveIndex)=>{
        //                         return <button className="moveButton"
        //                         key={moveIndex}
        //                         onClick={async ()=>{
        //                             await fetchMove(moveObj?.move?.url);
        //                             // Open the modal after fetching
        //                             setIsModalOpen(true); 
        //                         }}>
        //                             {moveObj?.move?.name.replaceAll('-',' ').toUpperCase()}
        //                         </button>
        //                     })
        //                 }
        //             </div>
        //     </div>
        // </div>

        <div className="pokecard">
            {
                isLibraryOpen &&
                    <SavedPaletteWindow setIsLibraryOpen={setIsLibraryOpen}></SavedPaletteWindow>
            }
            <main>
                <ViewPalette shiny = {isShiny}></ViewPalette>
            </main>
            <footer className="pc-action">
                <button className="pc-action--primary"
                onClick={()=>{setSelectedPokemon(randomPokemonNumber())}}>Generate</button>
                <span className="secondary">
                    <button className="pc-action--secondary"
                    onClick={()=>{setIsShiny(!isShiny)}}><span className="material-symbols-rounded">star_shine</span></button>
                    <button className="pc-action--secondary"><span className="material-symbols-rounded">ios_share</span></button>
                    <button className="pc-action--secondary"><span className="material-symbols-rounded">favorite</span></button>
                    <button className="pc-action--secondary"
                    onClick={()=>{setIsLibraryOpen(!isLibraryOpen)}}><span className="material-symbols-rounded">palette</span></button>
                </span>
            </footer>
        </div>
    )
}

