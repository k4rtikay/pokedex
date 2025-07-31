import { useState, useEffect } from "react";

export function usePokemon(pokemon){
    const [data,setData]=useState(null);
    const [loading, setLoading]=useState(false);
    const [description, setDescription] = useState('')

    useEffect(()=>{
        if(!pokemon) return

        let cache={}
        
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        if(selectedPokemon in cache){
            setData(cache[pokemon])
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
                cache[pokemon]=resData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }
    },[])

    return { data, description, loading, error}
}