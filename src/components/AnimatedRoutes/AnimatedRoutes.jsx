import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Landing from '../Landing/Landing'
import MainAppLayout from '../MainAppLayout/MainAppLayout'
import { AnimatePresence, isValidMotionProp } from 'framer-motion';
import Auth from '../Auth/Auth';
import { useAuth } from '../../Context/AuthContext';
import SavedPaletteWindow from '../palette/SavedPaletteWindow';
import Layout from './Layout';


export default function AnimatedRoutes(){   
    const {globalUser} = useAuth()
    let location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {<Route path='/' element={<Landing></Landing>}></Route>}
                <Route path='/app' element={<Layout/>}>
                    <Route index element={<MainAppLayout/>}></Route>
                    <Route path='auth' element={<Auth/>}></Route>
                    <Route path='saved-palettes' element={<SavedPaletteWindow/>}></Route>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}