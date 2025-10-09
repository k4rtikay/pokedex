import './SavedPaletteWindow.scss'
import SavedPalette from "./SavedPalette"
import { useDatabase } from "../../Context/DatabaseContext"
import { useAuth } from '../../Context/AuthContext'
import { AnimatePresence,motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { usePokedex } from '../../Context/PokedexContext'

export default function SavedPaletteWindow(){

    const { savePalette,loading } = useDatabase()
    const {globalUser} = useAuth()
    const savedPalettesRef = useRef()
    const { isDesktop, isLibraryOpen, setIsLibraryOpen } = usePokedex()

    const variants = {
        hidden:{
            y: '100%',
            transition: {duration: 0.3, ease: [0.85, 0, 0.15, 1]}
        },
        visible:{
            y: 0,
            transition: {duration: 0.3, ease: [0.85, 0, 0.15, 1]}
        },
        hiddenDesktop:{
            translateX: '1000px',
            transition: {duration: 0.3, ease: [0.85, 0, 0.15, 1]}
        },
        visibleDesktop:{
            translateX: '0px',
            transition: {duration: 0.3, ease: [0.85, 0, 0.15, 1]}
        }
    }


    useEffect(() => {
        if (isLibraryOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
        return () => document.body.classList.remove('menu-open')
    }, [isLibraryOpen])

    console.log(savePalette)

    if(loading){
        console.log('loading palettes')
        return(
            <div>
                <p>Palettes are loading...</p>
            </div>
        )
    }
    
    return(
        <AnimatePresence>
            
            {isLibraryOpen&&
                <motion.div className="savedPaletteWindow"
                    variants={variants}
                    initial={!isDesktop?'hidden':'hiddenDesktop'}
                    animate={!isDesktop?'visible':'visibleDesktop'}
                    exit={!isDesktop?'hidden':'hiddenDesktop'}
                    key={'savedPalettesWindow'}
                    ref={savedPalettesRef}>
                    <div className="savedPaletteContainer">
                        <div className="savedPaletteHeader">
                            <h1>Library</h1>
                            <button
                            onClick={()=>{setIsLibraryOpen(false)}}><span className="material-symbols-rounded">close</span></button>
                        </div>
                        <input type="text" placeholder="Search by name..." />
                        {(globalUser && savePalette.length!=0)?(
                            <div className="savedPalettesPane">
                                {
                                    savePalette.map((ColPalette)=>{
                                        return(
                                            <SavedPalette palette={ColPalette.palette} name={ColPalette.name} key={ColPalette.id} id={ColPalette.id}/>
                                        )
                                    })
                                }
                            </div>
                        ):(globalUser && savePalette.length==0)?(
                            <div className="noPalettesSaved">
                                <p>No palettes saved yet.</p>
                                <p>Search up your favourite Pokemon and get inspired!!</p>
                
                                {/* <?xml version="1.0" encoding="UTF-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
                                <svg viewBox="0 0 48 48" id="a" xmlns="http://www.w3.org/2000/svg"><circle id="b" className="c" cx="23.99" cy="23.99" r="8"/><path className="c" d="M2.83,27.75c1.77,10.08,10.57,17.74,21.16,17.74s19.39-7.66,21.16-17.74h-8.71c-1.61,5.35-6.58,9.24-12.45,9.24s-10.84-3.89-12.45-9.24H2.83Z"/><path className="c" d="M2.82,20.25C4.59,10.16,13.4,2.49,23.99,2.49s19.4,7.67,21.17,17.76h-8.71c-1.61-5.36-6.58-9.26-12.46-9.26s-10.85,3.9-12.46,9.26H2.82Z"/></svg>
                
                            </div>
                        ):(
                
                            <div className="guestPaletteWindow">
                                <div className="frame">
                                    <span className="frameContent">
                                        <h1><i className="fa-solid fa-lock"></i> Login to save your palettes</h1>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            }

        </AnimatePresence>
    )
}