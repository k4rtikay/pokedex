import { useState, useEffect, useContext, createContext } from "react";
import { auth, googleProvider } from "../../firebase.js";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


const AuthContext =  createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [globalUser, setGlobalUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,user =>{
            setGlobalUser(user)
            setIsLoading(false)
        })

        return unsubscribe
    },[])

    async function signup(auth,email,password,username){
        try{
            const userCrendential =  await createUserWithEmailAndPassword(auth,email,password)
            const user = userCrendential.user
            await updateProfile(user,{
                displayName: username
            })
            return user
        }catch(err){
            throw err
        }
    }

    function login(auth,email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logout(){
        setGlobalUser(null)
        return signOut(auth)
    }

    async function googleSignIn(){
        try{
            const result = await signInWithPopup(auth,googleProvider)
            const user = result.user
            console.log('signed with google')
            return user
        }catch(err){
            console.error(err.message)
            throw err
        }
    }
    const value = { globalUser, setGlobalUser,logout, login, signup, googleSignIn }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}