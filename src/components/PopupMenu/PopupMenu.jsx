import './PopupMenu.scss'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'



export default function PopupMenu(){
    const [isMenuActive, setIsMenuActive] = useState(false)
    const {globalUser} = useAuth()

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
                        <p>{isMenuActive&&(globalUser?globalUser.displayName:'Guest')}</p>
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
                                            <button>About</button>
                                            <button>Feedback</button>
                                            <button>Dark Mode</button>
                                        </div>
                                        <button className='menu-signout'>Sign Out</button>
                                        <footer>Made with ❤️ by k4rtikay </footer>
                                </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
    )
}