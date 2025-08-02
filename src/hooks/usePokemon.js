import { useState, useEffect } from "react";
import { getPokedexNumber } from "../utils";

const CACHE_LIMIT = 50;

function useCache(cacheKey){
    const getCache = () => {
        const dataFromStorage = localStorage.getItem(cacheKey);

        return JSON.parse(dataFromStorage || '{}');
    };
    const setCache = (key,value) =>{
        const currentCache = getCache()

        currentCache[key] = value

        //to prevent exceeding limits of localStorage, we delete the oldest entry from the cache every time it exceeds a given limit, here, CACHE_LIMIT

        let keys = Object.keys(currentCache)
        if(keys.length>CACHE_LIMIT){
            const oldestKey = currentCache[0]
            delete currentCache[oldestKey]
        }

        localStorage.setItem(cacheKey, JSON.stringify(currentCache))
    }

    return{ getCache, setCache }
}

export function usePokemon(pokemon){
    const [data,setData]=useState(null);
    const [loading, setLoading]=useState(false);
    const [description, setDescription] = useState('')
    const { getCache: getPokedexCache, setCache: setPokedexCache } = useCache('pokedex')
    const { getCache: getDescCache, setCache: setDescCache } = useCache('descriptionCache')


    useEffect(()=>{
        if(pokemon==null) return

        async function fetchPokemon(){
            setLoading(true)
            try{

                const pokedexCache = getPokedexCache()
                if(pokedexCache[pokemon]){
                    setData(pokedexCache[pokemon])
                }else{
                    let baseUrl = 'https://pokeapi.co/api/v2/'
                    let suffix = `pokemon/${getPokedexNumber(pokemon)}`
                    let res = await fetch(baseUrl+suffix);
                    let resData = await res.json();
                    console.log("fetched pokemon")
                    setData(resData)
                    console.log(resData)
                    setPokedexCache(pokedexCache, resData)
                }
                
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }
        }

        fetchPokemon()
    },[pokemon])


     useEffect(() => {
        const speciesUrl = data?.species?.url;
        if (!speciesUrl) return;

        const fetchDescription = async () => {
            try {
                const descCache = getDescCache();
                const speciesName = data.species.name;
                if (descCache[speciesName]) {
                    setDescription(descCache[speciesName])
                } else {
                    const descRes = await fetch(speciesUrl)
                    const descData = await descRes.json()
                    const enDescription = descData?.flavor_text_entries.find(entry=>(entry.version.name==='firered' && entry.language.name==='en'))?.flavor_text
                    setDescription(enDescription || '')
                    descCache[speciesName] = enDescription
                    setDescCache(descCache)
                }
            } catch (err) {
                console.error("Failed to fetch description", err);
            }
        };

        fetchDescription();
    }, [data?.species?.url]);

    return { data, description, loading}
}