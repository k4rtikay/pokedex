import {Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Landing from '../Landing/Landing'
import MainAppLayout from '../MainAppLayout/MainAppLayout'
import { AnimatePresence } from 'framer-motion';
import Auth from '../Auth/Auth';
import { useAuth } from '../../Context/AuthContext';
import SavedPaletteWindow from '../palette/SavedPaletteWindow';
import Layout from './Layout';


export default function AnimatedRoutes(){   
    const {globalUser, isLoading} = useAuth()
    let location = useLocation();

    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }


    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {globalUser? <Route path='/' element={<Navigate to={'/app'} replace/>}></Route>: <Route path='/' element={<Landing/>}></Route>}
                <Route path='/app' element={<Layout/>}>
                    <Route index element={<MainAppLayout/>}></Route>
                    <Route path='auth' element={<Auth/>}></Route>
                    <Route path='saved-palettes' element={<SavedPaletteWindow/>}></Route>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}