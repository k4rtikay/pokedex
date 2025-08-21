import { useState, useEffect, useRef } from "react"
import ColorThief from 'colorthief';
import './ViewPalette.css'
import { colorForIntensity, randomPokemonNumber } from "../../utils";
import { ColorTooltip } from "./ColorTooltip";
import { usePokedex } from "../../Context/PokedexContext";
import { Modal } from "../Modal/Modal";
import { useDatabase } from "../../Context/DatabaseContext";
import { p } from "framer-motion/client";


export function ViewPalette(){

    const {frontSprite, setSelectedPokemon} = usePokedex()
    const {savePalette, setSavePalette, addPalette} = useDatabase()

    const [palette, setPalette] = useState(null)
    const [copied, setCopied] = useState(false)
    const imgRef = useRef(null)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [paletteName, setPaletteName] = useState('')

    const handleImageLoad = () => {
        const img = imgRef.current;
        const colorThief = new ColorThief();
        try {

            const newColors = colorThief.getPalette(img, 6);
            // console.log('newcolors' + newColors)
            
            if(!palette){
                const initialPalette = newColors.map(colorVal => ({color: colorVal, isLocked: false, sourceSprite: frontSprite}))
                setPalette(initialPalette)
                return
            }

            const updatedPalette = palette.map((oldColorObject, index)=>{
                if(oldColorObject.isLocked){
                    return oldColorObject
                }

                return {
                    color: newColors[index],
                    isLocked: false,
                    sourceSprite: frontSprite
                }
            })

            setPalette(updatedPalette)
        } catch (err) {
            console.error(err);
        }
    }

    const handleColorLocking = (lockedIndex)=>{
        const newPalette = palette.map((colorObj, colorIndex)=>{
            if(colorIndex!==lockedIndex){
                return colorObj
            }else{
                return {
                    ...colorObj,
                    isLocked: !colorObj.isLocked,
                }
            }
        })

        setPalette(newPalette)
    }

    const handleSavingPalettes = (name) => {
        if (!name.trim()) {
            // alert("Please enter a palette name.");
            return (
                <p>No name assigned.</p>
            )
        }

        const newSavedPalette = {
            name: name,
            palette: palette
        };

        setSavePalette(prevSavedPalettes => [...prevSavedPalettes, newSavedPalette]);

        addPalette(newSavedPalette)

        // Close the modal and reset the input field
        setIsSaveModalOpen(false);
        setPaletteName('');
    }

    //console.log(palette)

    useEffect(()=>{
        const handleSpacebar = (event) => {
            if(event.key==' ' && isSaveModalOpen==false ){
                setSelectedPokemon(randomPokemonNumber())
                console.log('randomizing......')
                event.preventDefault()
            }
        }

        window.addEventListener('keydown',handleSpacebar)

        return ()=>{
            window.removeEventListener('keydown',handleSpacebar)
        }
    },[setSelectedPokemon, isSaveModalOpen])

    console.log(savePalette)


    return (
        <div className="viewPalette">
            <Modal onClose={()=>{setIsSaveModalOpen(false)}} isModalOpen={isSaveModalOpen}>
                <form onSubmit={()=>{handleSavingPalettes(paletteName)}}>
                    <p><b>Save Palette</b></p>
                    <label htmlFor="save-palette-name">Enter a name for the palette:</label>
                    <input id="save-palette-name" placeholder="Sample Palette" onChange={(e)=>setPaletteName(e.target.value)} required></input>
                    <button type="submit" disabled={!paletteName}>Save</button>
                </form>
            </Modal>

            <button className="palette-window-button save-palette-button"
            onClick={()=>{
                setIsSaveModalOpen(true)
            }}><i className="fa-regular fa-heart"></i> Save</button>
            <button className="palette-window-button close-palette-modal">✕ Close</button>

            <div className="paletteBarContainer">
                {palette?.map((domColors, domColorIndex)=>{
                    const domColor = domColors.color
                    const rgbString = `rgb(${domColor[0]},${domColor[1]},${domColor[2]})`
                    return(
                        <div
                        style={{backgroundColor:`rgb(${domColor[0]},${domColor[1]},${domColor[2]})`,color:colorForIntensity(domColor[0],domColor[1],domColor[2])}}
                        key={domColorIndex}
                        className={"paletteBar " + (domColors.isLocked?"is-locked":"")}>
                            <div className="colorCopyBtn">
                                <p className="colorValue">{rgbString}</p>
                                <button
                                className="color-options"
                                onClick={async (e)=>{
                                    const text = rgbString;
                                    try{
                                        await navigator.clipboard.writeText(text)
                                        setCopied(true)
                                        setTimeout(() => {
                                            setCopied(false)
                                        }, 2000);
                                    } catch(err){
                                        console.log(err)
                                    }
                                }}><i aria-label="copy button" className="fa-regular fa-copy"></i></button>
                                <button
                                    className={'color-options lockButton ' + (domColors.isLocked?'lockedColor':'')}
                                    onClick={()=>{handleColorLocking(domColorIndex)}}>
                                        <span aria-label="lock button" className="fa-solid fa-lock"></span>
                                        <span aria-label="unlock button" className="fa-solid fa-unlock"></span>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <img src={frontSprite}
            alt="Image of selected pokemon"
            ref={imgRef}
            crossOrigin="anonymous"
            className="paletteSprite"
            loading="lazy"
            onLoad={handleImageLoad} />

            {copied&&
                <ColorTooltip text={'Color Copied!'}/>
            }
            

        </div>
    )
}