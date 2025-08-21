import { collection, deleteDoc, getDocs, query, where, doc, addDoc } from "firebase/firestore";
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
    const [savePalette, setSavePalette] = useState([])

    useEffect(()=>{
        if(globalUser){
            const fetchPalettes = async () => {
                setLoading(true);
                try {
                    const palettesRef = collection(db, 'palettes');
                    const q = query(palettesRef, where('userId', '==', globalUser.uid));
                    
                    const querySnapshot = await getDocs(q);
                    
                    const palettesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setSavePalette(palettesData);
                } catch (error) {
                    console.error("Error fetching palettes:", error);
                    setSavePalette([]); // Reset to empty on error
                } finally {
                    setLoading(false);
                }
            };

            fetchPalettes()
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
        deletePalette,
        loading
    }

    return(
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}