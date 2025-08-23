import { useState, useEffect, useRef } from "react"
import ColorThief from 'colorthief';
import './ViewPalette.css'
import { colorForIntensity, randomPokemonNumber } from "../../utils";
import { ColorTooltip } from "./ColorTooltip";
import { usePokedex } from "../../Context/PokedexContext";
import { Modal } from "../Modal/Modal";
import { useDatabase } from "../../Context/DatabaseContext";
import { PaletteBar } from "./PaletteBar";


export function ViewPalette(){

    const {frontSprite, setSelectedPokemon, data} = usePokedex()
    const {savePalette, setSavePalette, addPalette} = useDatabase()
    const [spriteToShow, setSpriteToShow] = useState(null);

    const [palette, setPalette] = useState(null)
    const [copied, setCopied] = useState(false)
    const imgRef = useRef(null)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [paletteName, setPaletteName] = useState('')
    let { name: pokemonName } = data || {}

    console.log(pokemonName)

    const handleImageLoad = () => {
        const img = imgRef.current;
        const colorThief = new ColorThief();
        try {

            const newColors = colorThief.getPalette(img, 6);
            // console.log('newcolors' + newColors)
            
            if(!palette){
                const initialPalette = newColors.map(colorVal => ({id: Math.random().toString(36).slice(2, 9),color: colorVal, isLocked: false, sourceSprite: frontSprite}))
                setPalette(initialPalette)
                return
            }

            const updatedPalette = palette.map((oldColorObject, index)=>{
                if(oldColorObject.isLocked){
                    return oldColorObject
                }

                return {
                    ...oldColorObject,
                    color: newColors[index],
                    sourceSprite: frontSprite,
                }
            })

            setPalette(updatedPalette)
        } catch (err) {
            console.error(err);
        }
    }

    const handleColorLocking = (idToLock)=>{
        const newPalette = palette.map((colorObj)=>{
            if(colorObj.id!==idToLock){
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

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
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

    useEffect(()=>{
        // pokemonName = pokemonName.toLowerCase()

        

        const animUrl = `/api/sprites/black-white/anim/normal/${pokemonName}.gif`
        const animFrontSprite = new Image()

        animFrontSprite.src = animUrl

        animFrontSprite.onload = () =>{
            setSpriteToShow(animUrl)
        }
    },[frontSprite])


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
                {palette?.map((colorObj) => (
                    <PaletteBar
                        key={colorObj.id}
                        colorObject={colorObj}
                        onLock={handleColorLocking}
                        onCopy={handleCopy}
                    />
                ))}
            </div>

            <div className="paletteSpriteContainer">
                <img src={spriteToShow}
                alt="Image of selected pokemon"
                ref={imgRef}
                crossOrigin="anonymous"
                className="paletteSprite"
                loading="lazy"
                onLoad={handleImageLoad} />
            </div>

            {copied&&
                <ColorTooltip text={'Color Copied!'}/>
            }
            

        </div>
    )
}