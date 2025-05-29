import { useState, useEffect } from "react"
import { first151Pokemon, getFullPokedexNumber, getPokedexNumber } from "../../utils";
import { Typecard } from "../Typecard/Typecard";
import './Pokecard.css'
import './paletteButton.css'
import { Modal } from "../Modal/Modal";
import { PaletteModal } from "../paletteModal/paletteModal";
import colorthief from 'colorthief';
import ViewPalette from "../paletteModal/ViewPalette";


export function Pokecard({selectedPokemon, setIsModalOpen, isModalOpen, isPaletteModalOpen, setIsPaletteModalOpen, frontSprite, setFrontSprite}){

    const [data,setData]=useState(null);
    const [loading, setLoading]=useState(false);
    const [skill, setSkill] = useState(null);
    const [moveLoading, setMoveLoading]=useState(false)

    const { name, height, weight, abilities, stats, types, moves, sprites } = data || {}

    function heightInFeet(hght){
        const totalInches = hght*3.937
        const feet = Math.floor(totalInches/12)
        const inch = Math.round(totalInches%12)
        return `${feet}'${inch}"`
    }

    async function fetchPokemonMove(move, moveUrl){
        if(moveLoading||!localStorage||!moveUrl) return

        setSkill(null)

        let moveCache={}

        if(localStorage.getItem('poke-moves')){
            moveCache=JSON.parse(localStorage.getItem('poke-moves'))
        }

        if(move in moveCache){
            setSkill(moveCache[move])
            console.log('move found in cache')
            setIsModalOpen(true);
            return
        }

        try{
            setMoveLoading(true)
            const moveRes = await fetch(moveUrl)
            const moveData = await moveRes.json()

            const description = moveData?.flavor_text_entries.filter(val => {
                return val.version_group.name == 'firered-leafgreen'
            })[0]?.flavor_text

            const {name, accuracy, power, pp} = moveData

            const skillData= {
                name: name,
                accuracy: accuracy,
                power: power,
                pp: pp,
                description: description
            }

            moveCache[move]=skillData
            localStorage.setItem('poke-moves', JSON.stringify(moveCache))
            setSkill(skillData)

            setIsModalOpen(true);
 
        }
        catch(err){
            console.log(err)
        }
        finally{
            setMoveLoading(false)
        }
    }

    useEffect(()=>{

        if(loading||!localStorage) return

        let cache={}
        
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        if(selectedPokemon in cache){
            setData(cache[selectedPokemon])
            console.log('pokemon found in cache')
            return
        }

        async function fetchPokemon(){
            setLoading(true)
            try{
                let baseUrl = 'https://pokeapi.co/api/v2/'
                let suffix = `pokemon/${getPokedexNumber(selectedPokemon)}`
                let res = await fetch(baseUrl+suffix);
                let resData = await res.json();
                console.log("fetched pokemon")
                setData(resData)
                console.log(resData)
                cache[selectedPokemon]=resData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }

        fetchPokemon()



    },[selectedPokemon])

    if(loading||!data){
        return(
            <div>
                <h4>Loading....</h4>
            </div>
        )
    }

    const { back_default,back_shiny,front_default,front_shiny } = sprites

    setFrontSprite(front_default)



    return (
        <div className="pokeEntry">
            {(isModalOpen)&&(
                <Modal onClose={()=>{setIsModalOpen(false)}} isModalOpen={isModalOpen}>
                    {skill?
                    <>
                        <h3>{skill.name.replaceAll('-',' ').toUpperCase()}</h3>
                        <h4>Description:</h4>
                        <p>{skill.description}</p>
                        <h4>Stats:</h4>
                        <ul>
                            <li>Accuracy: {skill.accuracy?skill.accuracy:'---'}</li>
                            <li>Power: {skill.power?skill.power:'---'}</li>
                            <li>PP: {skill.pp}</li>
                        </ul>
                    </> : (<div>Loading....</div>)
                    }
                </Modal>
            )}


            {(isPaletteModalOpen)&&(
                <PaletteModal onClose={()=>{setIsPaletteModalOpen(false)}} isPaletteModalOpen={isPaletteModalOpen}>
                    <>
                    <ViewPalette frontSprite={frontSprite} isPaletteModalOpen={isPaletteModalOpen}/>
                    </>
                </PaletteModal>
            )}



            <div className="pokeImage">
                <div className="pokeImgHeader">
                    <div className="pokeName">
                        <p>{getFullPokedexNumber(selectedPokemon)}</p>
                        <p>{name.toUpperCase()}</p>
                    </div>
                    <button className="btn-61"
                    onClick={()=>{setIsPaletteModalOpen(true)}}><span>Scan for Colors!</span></button>
                </div>
                <div className="typeContainer">
                    {
                    types.map((typeObj, typeIndex)=>{
                        return <Typecard key ={typeIndex} type={typeObj?.type?.name}/>
                    })
                    }
                </div>
                <img className="default-img" src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`} alt={`${name}-big-image`}/>
                <div className="sprites-container">
                        <img src={back_default} alt={`Back-sprite-of-${name}`} className="poke-sprite" />
                        <img src={front_default} alt={`Front-sprite-of-${name}`} className="poke-sprite" />
                        <img src={back_shiny} alt={`shiny-back-sprite-of-${name}`} className="poke-sprite" />
                        <img src={front_shiny} alt={`shiny-front-sprite-of-${name}`} className="poke-sprite" />
                </div>
            </div>



            <div className="pokeData">
                    <span style={{color:'blue',marginBottom:'7px'}}>Height:</span> <span style={{marginBottom:'7px'}}>{heightInFeet(height) }</span>
                    <span style={{color:'blue',marginBottom:'7px'}}>Weight:</span> <span style={{marginBottom:'7px'}}>{(weight*0.220462).toFixed(1)} lbs</span>
                    <div className="abilites">
                        <span style={{color:'blue'}}>Abilities:</span>
                        <ul>{abilities.map((ability, abilityIndex)=>{
                            return <li key={abilityIndex}>{ability?.ability?.name}</li>
                        })}</ul>
                    </div>
                    <div className="stats">
                        <span style={{color:'blue'}}>Stats:</span>
                        <ul>{
                            stats.map((stat,statIndex)=>{
                                return <li key={statIndex}>{stat?.stat?.name}: {stat.base_stat}</li>
                            })
                        }</ul>
                    </div>
                    <span style={{color:'blue',marginBottom:'7px'}}>Moves:</span>
                    <div className="moveSet">
                        {
                            moves.map((moveObj, moveIndex)=>{
                                return <button className="moveButton"
                                key={moveIndex}
                                onClick={()=>{fetchPokemonMove(moveObj?.move?.name,moveObj?.move?.url)}}>
                                    {moveObj?.move?.name.replaceAll('-',' ').toUpperCase()}
                                </button>
                            })
                        }
                    </div>
            </div>
        </div>
    )
}

