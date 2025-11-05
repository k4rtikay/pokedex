import './PopupMenu.scss'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import Auth from '../Auth/Auth'
import { usePokedex } from '../../Context/PokedexContext'


export default function PopupMenu({ isMenuActive, setIsMenuActive, triggerRef }){
    // const [isMenuActive, setIsMenuActive] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [menuPosition, setMenuPosition] = useState({top: 0, left: 0, right: 0, iconSize: 0})
    const { globalUser,logout } = useAuth()
    const navigate = useNavigate();
    const { isDesktop, isDarkMode, setIsDarkMode } = usePokedex()
    const dropdownRef = useRef(null);

    const variants = {
        open: {
            opacity: 1,
            scale: isDesktop ? 1 : 1,
            width: isDesktop ? 240 : 288,
            height: isDesktop ? 'auto' : 428,
            top: isDesktop ? 'auto' : menuPosition.top + 8,
            left: isDesktop ? 'auto' : menuPosition.left + 8,
            transition: { 
                duration: 0.52, 
                ease: [0.68, -0.6, 0.32, 1.35], 
                staggerChildren: 0.07,
                delayChildren: 0.1 
            }
        },
        closed: {
            opacity: 0,
            scale: isDesktop ? 0.8 : 1,
            width: isDesktop ? 240 : (menuPosition.iconSize || 48),
            height: isDesktop ? 'auto' : (menuPosition.iconSize || 48),
            top: isDesktop ? 'auto' : menuPosition.top,
            left: isDesktop ? 'auto' : menuPosition.left,
            transition: { 
                duration: 0.3, 
                ease: [0.87, 0, 0.13, 1], 
                staggerChildren: 0.05, 
                staggerDirection: -1 
            }
        }
    }

    const nameVariants ={
        open:{
            opacity: 1,
            transition: {duration: 0.1, ease: [0.68, -0.6, 0.32, 1.35]}
        },
        closed:{
            opacity: 0,
            transition: {duration: 0.4, ease: [0.68, -0.6, 0.32, 1.35]}
        }
    }

    const navItemVariants = {
        open: {
            y: 0,
            x: 0,
            opacity: 0.75,
            transition: {
             ease: [0.44, 1.56, 0.64, 1]
            }
        },
        closed: {
            opacity: 0,
            y:-16,
            x: isDesktop ? 30 : -30,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    console.log(isMenuActive)

    useEffect(()=>{
        if(isMenuActive, triggerRef?.current){
            const rect = triggerRef.current.getBoundingClientRect()
            const iconSize = rect.width

            setMenuPosition({
                top: rect.top,
                left: rect.left,
                iconSize: iconSize
            })
        }
    },[triggerRef, isMenuActive])

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
    }, [isMenuActive]);

    useEffect(() => {
        if (isMenuActive) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
        return () => document.body.classList.remove('menu-open')
    }, [isMenuActive])

    return(
        <div className="menu-container" ref = {dropdownRef}>

            <Modal isModalOpen={isAuthOpen} onClose={()=>{setIsAuthOpen(false)}}>
                <Auth></Auth>
            </Modal>

                <AnimatePresence>

                    <button className="menu-trigger"
                    onClick={()=>{setIsMenuActive(true)}}><span className="h-icon material-symbols-rounded">account_circle</span></button>
                    { isMenuActive &&
                        (
                                <motion.div
                                key={'username'}
                                variants={variants}
                                initial= {'closed'}
                                className='menu'
                                animate= {'open'} 
                                exit={'closed'}
                                style={{
                                    transformOrigin: isDesktop ? 'top right' : 'top left'
                                }}
                                >
                                    <div className={"menu-top "}>
                                            <motion.div
                                            variants={nameVariants}
                                            initial='closed'
                                            aria-hidden={!isMenuActive}
                                            animate={'open'}
                                            exit={'closed'}
                                            key={'name'}
                                            style={{}}>{(globalUser?globalUser.displayName:'Guest')}</motion.div>       
                                    </div>

                                        <nav className="menu-nav">
                                            <motion.button variants={navItemVariants} whileHover={{opacity:1}}>About</motion.button>

                                            <motion.a variants={navItemVariants} href='https://github.com/k4rtikay/pokedex/issues' target='_blank' rel='noopener noreferrer' whileHover={{opacity:1}}>Feedback</motion.a>

                                            <motion.button variants={navItemVariants}
                                            whileHover={{opacity:1}}
                                            onClick={()=>{setIsDarkMode(!isDarkMode)}}>Toggle Theme</motion.button>

                                            <motion.button variants={navItemVariants}
                                            whileHover={{opacity:1}}
                                            className={globalUser && 'menu-signout'}
                                            onClick={async ()=>{
                                                if(globalUser){
                                                    console.log('logging out..')
                                                    await logout()
                                                    console.log('navigating..')
                                                    navigate('/')
                                                }else{
                                                    setIsAuthOpen(true)
                                                    setIsMenuActive(false)
                                            }}}>{globalUser?'Sign Out':'Sign In'}</motion.button>
                                        </nav>
                                        
                                        <motion.footer variants={navItemVariants}>Made with ❤️ by <a href='https://github.com/k4rtikay' target="_blank" rel='noopener noreferrer'>k4rtikay</a> </motion.footer>
                                </motion.div>
                        )
                    }
                </AnimatePresence>
        </div>
    )
}