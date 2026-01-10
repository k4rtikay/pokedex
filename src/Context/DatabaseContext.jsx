import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "./AuthContext";
import { useContext, createContext, useState, useEffect } from "react";

const DatabaseContext = createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const { globalUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [savePalette, setSavePalette] = useState([]);

  useEffect(() => {
    let unsubscribe = () => { };
    if (globalUser) {
      setLoading(true);
      const palettesRef = collection(db, "palettes");
      const q = query(palettesRef, where("userId", "==", globalUser.uid));

      //using onSnapshot to set up a rea time listener
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const paletteData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort by createdAt descending (newest first)
        paletteData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setSavePalette(paletteData);
        setLoading(false);
      });
    } else {
      setSavePalette([]);
      setLoading(false);
    }

    //clean up function
    return () => unsubscribe();
  }, [globalUser]);

  function addPalette(paletteData) {
    if (globalUser) {
      const dataToSave = {
        ...paletteData,
        userId: globalUser.uid,
        createdAt: serverTimestamp(),
      };
      return addDoc(collection(db, "palettes"), dataToSave);
    }
  }

  async function deletePalette(paletteId) {
    await deleteDoc(doc(db, "palettes", paletteId));
  }

  async function updatePalette(newPalette, paletteId) {
    await updateDoc(doc(db, "palettes", paletteId), newPalette);
  }

  const value = {
    savePalette,
    setSavePalette,
    addPalette,
    deletePalette,
    loading,
    updatePalette,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
