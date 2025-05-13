import { useState, useEffect } from "react"
import { first151Pokemon, getFullPokedexNumber, getPokedexNumber } from "../../utils";
import { Typecard } from "../Typecard/Typecard";
import './Pokecard.css'


export function Pokecard({selectedPokemon}){

    const [data,setData]=useState(null);
    const [loading, setLoading]=useState(false);

     const { name, height, abilities, stats, types, moves, sprites } = data || {}

    useEffect(()=>{

        if(loading||!localStorage) return

        let cache={}
        
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        if(selectedPokemon in cache){
            setData(cache[selectedPokemon])
            console.log('pokemon found in cache')
            console.log(cache[selectedPokemon])
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


    return (
        <div className="pokeData">
            <div className="pokeImage">
                <div className="pokeName">
                <p>{getFullPokedexNumber(selectedPokemon)}</p>
                <p>{name}</p>
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
        </div>
    )
}