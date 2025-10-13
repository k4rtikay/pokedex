import { useState, useEffect } from "react"
import ColorThief from 'colorthief';
import './ViewPalette.scss'
import { colorForIntensity, randomPokemonNumber } from "../../utils";
import { ColorTooltip } from "./ColorTooltip";
import { usePokedex } from "../../Context/PokedexContext";
import { Modal } from "../Modal/Modal";
import { useDatabase } from "../../Context/DatabaseContext";
import { PaletteBar } from "./PaletteBar";
import { motion, AnimatePresence } from "framer-motion";


export function ViewPalette({isSaveModalOpen,setIsSaveModalOpen }){

    const { frontSprite, selectedPokemon, setSelectedPokemon, data, palette, setPalette, setThemeColor, isGenerating, setIsGenerating, isShiny, setIsShiny, isDesktop } = usePokedex()
    const {savePalette, setSavePalette, addPalette} = useDatabase()
    const [spriteToShow, setSpriteToShow] = useState(null);

    // const [palette, setPalette] = useState(null)
    const [copied, setCopied] = useState(false)
    const [paletteName, setPaletteName] = useState('')
    const [isImgLoading, setIsImgLoading] = useState(false)
    const [colorFormat, setColorFormat] = useState('rgb')
    let { name: pokemonName } = data || {}

    // console.log(pokemonName)

    const handleImageLoad = (e) => {
        // const img = imgRef.current;
        // const img = new Image()
        // img.src = frontSprite
        // img.crossOrigin = 'anonymous'

        const img = e.target

        if (!img || img.naturalWidth === 0) return;

        const colorThief = new ColorThief();
        try {

            const newColors = colorThief.getPalette(img, 6,1);
            setThemeColor(`rgb(${colorThief.getColor(img,5  ).join(', ')})`)
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
            setIsGenerating(false)
        } catch (err) {
            console.error(err)
            setIsGenerating(false)
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

    const handleShadeSelection = (shade,id) =>{
        const newPalette = palette.map((colorObj)=>{
            console.log('setting shade..')
            if(colorObj.id==id){
                return {
                    ...colorObj,
                    color: shade
                }
            }else{
                return colorObj
            }
        })

        setPalette(newPalette)
        console.log('shade set!!!!!!')
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

        console.log(newSavedPalette)

        addPalette(newSavedPalette)

        // Close the modal and reset the input field
        setIsSaveModalOpen(false);
        setPaletteName('');
    }

    const cycleColorFormat = () => {
        if (colorFormat === 'rgb') setColorFormat('hex');
        else if (colorFormat === 'hex') setColorFormat('hsl');
        else setColorFormat('rgb');
    }

    const variants = {
        entry: {},
        exit:{}
    }

    const spriteVariants = {
        initial: {opacity: 0, scale:1},
        animate: {opacity: 1, scale: isDesktop?1.8:1.5, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }},
        exit : {opacity: 0, scale: 1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    }

    console.log(palette)

    useEffect(()=>{
        const handleSpacebar = (event) => {
            if(event.key==' ' && isSaveModalOpen==false && !isGenerating ){
                setSelectedPokemon(randomPokemonNumber())
                setIsGenerating(true)
                console.log('randomizing......')
                event.preventDefault()
            }
        }

        window.addEventListener('keydown',handleSpacebar)

        return ()=>{
            window.removeEventListener('keydown',handleSpacebar)
        }
    },[setSelectedPokemon, isSaveModalOpen, isGenerating])

    useEffect(()=>{
        setIsImgLoading(true)
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${isShiny?'shiny/':''}${selectedPokemon+1}.gif`

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src=spriteUrl

        img.onload=()=>{
            handleImageLoad({target: img})
            setSpriteToShow(spriteUrl)
            setIsImgLoading(false)
        }
    },[selectedPokemon, isShiny])


    return (
        <div className={`viewPalette ${isGenerating&&'is-loading'}`}>
            <Modal onClose={()=>{setIsSaveModalOpen(false)}} isModalOpen={isSaveModalOpen}>
                <form className="vp-save" onSubmit={(event)=>{
                    event.preventDefault()
                    handleSavingPalettes(paletteName)}}>
                    <h1>Save Palette</h1>
                    <span>
                        {palette?.map((colorObj,colorObjIndex) => (
                            <div style={{backgroundColor: `rgb(${ (colorObj.color && colorObj.color.join(', ')) || '128, 128, 128'})`}}
                            key={colorObjIndex}></div>
                        ))}
                    </span>
                    <label htmlFor="save-palette-name">Enter a name for the palette:</label>
                    <input id="save-palette-name" placeholder="Sample Palette" onChange={(e)=>setPaletteName(e.target.value)} required></input>
                    <button type="submit" disabled={!paletteName}>Save</button>
                </form>
            </Modal>

            <AnimatePresence>
                <motion.div className="paletteBarContainer">
                    {palette?.map((colorObj) => (
                        <PaletteBar
                            key={colorObj.id}
                            colorObject={colorObj}
                            onLock={handleColorLocking}
                            onCopy={handleCopy}
                            onShadeSelect = {handleShadeSelection}
                            format = {colorFormat}
                            onFormatCycle={cycleColorFormat}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

                <div className="paletteSpriteContainer">
                    <AnimatePresence mode="wait">
                        {
                            !isImgLoading && 
                            <motion.img src={spriteToShow}
                            alt="Image of selected pokemon"
                            crossOrigin="anonymous"
                            className="paletteSprite"
                            loading="lazy"
                            style={{transformOrigin: 'center center'}}

                            key={spriteToShow}
                            variants={spriteVariants}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            />
                            }
                    </AnimatePresence>
                </div>

            {copied&&
                <ColorTooltip text={'Color Copied!'}/>
            }
            

        </div>
    )
}