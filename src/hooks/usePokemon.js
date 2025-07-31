import { useState, useEffect } from "react";
import { getPokedexNumber } from "../utils";

function useCache(cacheKey){
    const getCache = () => {
        const dataFromStorage = localStorage.getItem(cacheKey);

        // Add this console.log to see what's being read
        //console.log(`For key "${cacheKey}", localStorage returned:`, dataFromStorage);

        return JSON.parse(dataFromStorage || '{}');
        
        JSON.parse(localStorage.getItem(cacheKey) || {})};
    const setCache = (data) => localStorage.setItem(cacheKey, JSON.stringify(data))

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
                    pokedexCache[pokemon]=resData
                    setPokedexCache(pokedexCache)
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