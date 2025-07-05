import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from '../Landing/Landing'
import MainAppLayout from '../MainAppLayout/MainAppLayout'
import { AnimatePresence } from 'framer-motion';

export default function AnimatedRoutes(){   
    let location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Landing/>}></Route>
            <Route path='/home'element={<MainAppLayout/>}></Route>
            </Routes>
        </AnimatePresence>
    )
}