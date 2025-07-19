import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Landing from '../Landing/Landing'
import MainAppLayout from '../MainAppLayout/MainAppLayout'
import { AnimatePresence, isValidMotionProp } from 'framer-motion';
import Auth from '../Auth/Auth';
import { useAuth } from '../../Context/AuthContext';
import SavedPalette from '../palette/SavedPalette';


export default function AnimatedRoutes(){   
    const {globalUser} = useAuth()
    let location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {<Route path='/' element={!globalUser?<Landing/>:<MainAppLayout/>}></Route>}
                <Route path='/home'element={<MainAppLayout/>}></Route>
                <Route path='/auth' element={<Auth/>}></Route>
            </Routes>
        </AnimatePresence>
        //<SavedPalette></SavedPalette>
    )
}