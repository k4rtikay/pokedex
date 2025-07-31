
import { useState } from 'react';

function useCache(cacheKey) {
    const getCache = () => JSON.parse(localStorage.getItem(cacheKey) || '{}');
    const setCache = (data) => localStorage.setItem(cacheKey, JSON.stringify(data));
    return { getCache, setCache };
}

export function usePokemonMove() {
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getCache, setCache } = useCache('poke-moves');


    const fetchMove = async (moveUrl) => {
        if (!moveUrl) return;

        const moveName = moveUrl.split('/').slice(-2, -1)[0];
        const cache = getCache();

        if (cache[moveName]) {
            setSkill(cache[moveName]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(moveUrl);
            const data = await res.json();

            const skillData = {
                name: data.name,
                accuracy: data.accuracy,
                power: data.power,
                pp: data.pp,
                description: data.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text
            };
            
            setSkill(skillData);
            cache[moveName] = skillData;
            setCache(cache);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Return the state and the function to trigger the fetch
    return { skill, loading, error, fetchMove };
}