import { collection, deleteDoc, getDoc, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "./AuthContext";
import { useContext, createContext, useState, useEffect } from "react";

const DatabaseContext = createContext()

export function useDatabase(){
    return useContext(DatabaseContext)
}

export function DatabaseProvider({children}){
    const { globalUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [savePalette, setSavePalette] = useState()

    useEffect(()=>{
        if(globalUser){
            setLoading(true)
            //query the saved palettes to fetch the palettes for the logged in users
            const palettesRef = collection(db,'palettes')
            const q = query(palettesRef,where('userId','==',globalUser.uid ))

            async ()=>{
                const querySnapshot = await getDoc(q)
                const palettesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setSavePalette(palettesData)
                setLoading(false)
            }
        } else {
            setSavePalette([])
            setLoading(false)
        }
    },[globalUser])

    function addPalette(paletteData){
        if (globalUser){
            const dataToSave = {...paletteData, userId: globalUser.uid}
            return addDoc(collection(db, 'palettes'),dataToSave)
        } 
    }

    async function deletePalette(paletteId){
        await deleteDoc(doc(db, 'palettes',paletteId))
    }

    const value = {
        savePalette,
        setSavePalette,
        addPalette,
        deletePalette
    }

    return(
        <DatabaseContext.Provider value={value}>
            {!loading && children}
        </DatabaseContext.Provider>
    )
}