import './PopupMenu.scss'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import Auth from '../Auth/Auth'
import { usePokedex } from '../../Context/PokedexContext'


export default function PopupMenu(){
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const { globalUser,logout } = useAuth()
    const navigate = useNavigate();
    const { isDesktop } = usePokedex()

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
        },
        openDesktop:{
            // x: -145,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            top: '-24px',
            left: '-190px',
	        transition: {duration: 0.5, ease: [0.68, -0.6, 0.32, 1.35]}
        },
        closedDesktop:{
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
            transition: {duration: 0.5, ease: [0.87, 0, 0.13, 1]}
        }
    }

    const nameVariants ={
        open:{
            opacity: 1,
            transition: {duration: 0.7, ease: [0.68, -0.6, 0.32, 1.35]}
        },
        closed:{
            opacity: 0,
            transition: {duration: 0.4, ease: [0.68, -0.6, 0.32, 1.35]}
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
            transition: {duration: 0.2, ease: [0.16, 1, 0.3, 1]}
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

                 <>
                    <div className={"menu-top "}>
                        <button className="menu-trigger"
                        onClick={()=>{setIsMenuActive(true)}}><span className="h-icon material-symbols-rounded">account_circle</span></button>

                        <AnimatePresence>
                            {isMenuActive&&
                                <motion.div
                                variants={nameVariants}
                                initial='closed'
                                aria-hidden={!isMenuActive}
                                animate={'open'}
                                exit={'closed'}
                                key={'name'}
                                style={{}}>{(globalUser?globalUser.displayName:'Guest')}</motion.div>
                            }
                        </AnimatePresence>

                    </div> 
                </>
                <AnimatePresence>
                    {
                        isMenuActive && (
                                <motion.div
                                key={'username'}
                                variants={variants}
                                initial= {isDesktop?'closedDesktop':'closed'}
                                className='menu'
                                animate= {isDesktop?'openDesktop':'open'} 
                                exit={isDesktop?'closedDesktop':'closed'}
                                >
                                        <div className="menu-nav">
                                            {!isDesktop&&<motion.button variants={navVariants}>About</motion.button>}
                                            {!isDesktop&&<motion.button variants={navVariants}>Feedback</motion.button>}
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
                                                setIsAuthOpen(true)
                                                setIsMenuActive(false)
                                        }}}>{globalUser?'Sign Out':'Sign In'}</motion.button>
                                        <footer>Made with ❤️ by <a href='https://github.com/k4rtikay' target="_blank">k4rtikay</a> </footer>
                                </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
    )
}