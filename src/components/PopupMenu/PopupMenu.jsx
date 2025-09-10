import './PopupMenu.scss'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'


export default function PopupMenu(){
    const [isMenuActive, setIsMenuActive] = useState(false)
    const {globalUser} = useAuth()
    const navigate = useNavigate();

    const variants = {
        open:{
            width: 288,
            height: 428,
            opacity: 1,
            top: '-24px',
            left: '-10px',
	        transition: {duration: 0.5, ease: [0.68, -0.6, 0.32, 1.35]}
        },
        closed:{
            width: 2,
            height: 2,
            opacity: 0,
            top: '0px',
            left: '0px',
            transition: {duration: 0.5, ease: [0.87, 0, 0.13, 1]}
        }
    }

    const nameVariants ={
        open:{
            opacity: 1,
            transition: {duration: 0.5, ease: [0.68, -0.6, 0.32, 1.35]}
        },
        closed:{
            opacity: 0,
            transition: {duration: 0.5, ease: [0.68, -0.6, 0.32, 1.35]}
        }
    }

    const navVariants = {
        open:{
            opacity: 1,
            x: 0,
            transition: {duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1]}
        },
        closed:{
            opacity: 0,
            x: -100,
            transition: {duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1]}
        }
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuActive(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return(
        <div className="menu-container" ref = {dropdownRef}>
                 <>
                    <div className={"menu-top "}>
                        <button className="menu-trigger"
                        onClick={()=>{setIsMenuActive(true)}}><span className="h-icon material-symbols-rounded">account_circle</span></button>
                        <motion.div
                        variants={nameVariants}
                        initial='closed'
                        aria-hidden={!isMenuActive}
                        animate={isMenuActive?'open':'closed'}
                        style={{pointerEvents: isMenuActive? 'auto' : 'none'}}>{(globalUser?globalUser.displayName:'Guest')}</motion.div>
                    </div> 
                </>
                <AnimatePresence>
                    {
                        isMenuActive && (
                                <motion.div
                                key={'username'}
                                variants={variants}
                                initial= 'closed'
                                className='menu'
                                animate= 'open' 
                                exit={'closed'}
                                >
                                        <div className="menu-nav">
                                            <motion.button variants={navVariants}>About</motion.button>
                                            <motion.button variants={navVariants}>Feedback</motion.button>
                                            <motion.button variants={navVariants}>Dark Mode</motion.button>
                                        </div>
                                        <motion.button variants={navVariants}
                                        className='menu-signout'
                                        onClick={async ()=>{
                                            if(globalUser){
                                                console.log('logging out..')
                                                await logout()
                                                console.log('navigating..')
                                                navigate('/')
                                            }else{
                                                navigate('/app/auth?mode=signin')
                                        }}}>{globalUser?'Sign Out':'Sign In'}</motion.button>
                                        <footer>Made with ❤️ by k4rtikay </footer>
                                </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
    )
}