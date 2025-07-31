import { useState, useEffect } from "react";

function useCache(cacheKey){
    const getCache = () => JSON.parse(localStorage.getItem(cacheKey) || {});
    const setCache = (data) => localStorage.setItem(cacheKey, JSON.stringify(data))

    return( getCache,setCache)
}

export function usePokemon(pokemon){
    const [data,setData]=useState(null);
    const [loading, setLoading]=useState(false);
    const [description, setDescription] = useState('')
    const { getCache: getPokedexCache, setCache: setPokedexCache } = useCache('pokedex')
    const { getCache: getDescCache, setCache: setDescCache } = useCache('descriptionCache')


    useEffect(()=>{
        if(!pokemon) return

        async function fetchPokemon(){
            setLoading(true)
            try{

                const pokedexCache = getPokedexCache()
                if(pokedexCache[pokemon]){
                    setData([pokedexCache[pokemon]])
                }else{
                    let baseUrl = 'https://pokeapi.co/api/v2/'
                    let suffix = `pokemon/${getPokedexNumber(selectedPokemon)}`
                    let res = await fetch(baseUrl+suffix);
                    let resData = await res.json();
                    console.log("fetched pokemon")
                    setData(resData)
                    console.log(resData)
                    pokedexCache[pokemon]=resData
                    setPokedexCache(pokedexCache)
                }

                //now fetch the description using the received pokemon data
                const speciesUrl = data?.species?.url;
                if(speciesUrl){
                    const descCache = getDescCache()

                    if(descCache[data?.species?.name]){
                        setDescription(descCache[data?.species?.name])
                    }else{
                        const descRes = await fetch(speciesUrl)
                        const descData = await descRes.json()
                        const enDescription  = descData?.flavor_text_entries.find(entry=>(entry.version.name==='firered' && entry.language.name==='en'))?.flavor_text
                        setDescription(enDescription)
                        descCache[data?.species?.name] = enDescription
                        setDescCache(descCache)
                    }
                }
                
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }
        }
    },[])

    return { data, description, loading}
}