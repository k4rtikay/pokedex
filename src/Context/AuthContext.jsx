import { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext =  createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [globalUser, setGlobalUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setGlobalUser(user)
            setIsLoading(false)
        })

        return unsubscribe
    },[])

    function signup(email,password){
        return createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return signInWithEmailAndPassword(email,password)
    }

    function logout(){
        setGlobalUser(null)
        return signOut(auth)
    }

    const value = { globalUser,logout, login, signup }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}