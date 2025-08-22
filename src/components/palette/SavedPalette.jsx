import { useState,useEffect,useRef } from 'react';
import { useDatabase } from '../../Context/DatabaseContext';
import './SavedPalette.css'
import { Modal } from '../Modal/Modal';

export default function SavedPalette(props){

    const { id,palette, name } = props;
    const { deletePalette, updatePalette } = useDatabase()
    const uniqueSprites = [...new Set(palette.map(p => p.sourceSprite))]
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [editedName, setEditedName] = useState(name)

    const inputRef = useRef()

    const handleUpdatePalette =(newName) =>{
        if(newName==''){
            setEditedName(name)
            return  
        }

        const obj = {
            name: newName
        }

        updatePalette(obj, id)
        setIsBeingEdited(false)
    }

    useEffect(() => {
        setEditedName(name)
    }, [name]);

    useEffect(()=>{
        if(isBeingEdited){
            inputRef.current?.focus()
        }
    },[isBeingEdited])


    console.log(isBeingEdited)

    return(
        <div>
            <div className="paletteCard">
                <Modal isModalOpen={isDeleteModalOpen} onClose={()=>{setIsDeleteModalOpen(false)}}>
                    <p>Are you sure you want to delete this palette?</p>
                    <button onClick={()=>{setIsDeleteModalOpen(false)}}>Cancel</button>
                    <button onClick={()=>{deletePalette(id)}}>Delete</button>
                </Modal>
                <div className="palette-color-stripes">
                    {palette.map((paletteObj,paletteObjIndex)=>{
                        const stripeBg = `rgb(${paletteObj.color.join(', ')})`
                        return(
                            <div key={paletteObjIndex} style={{backgroundColor:stripeBg}} className='savedColorStripe'></div>
                        )
                    })}
                </div>
                <div className="palette-content">
                    {
                        (!isBeingEdited)? <p>{editedName}</p> : 
                        <form onSubmit={()=>{handleUpdatePalette(editedName)}}>
                            <input type="text" value={editedName} onBlur={()=>{
                                console.log('onblur fired')
                                setEditedName(name)
                                setIsBeingEdited(false)
                            }} onChange={(e)=>{
                                setEditedName(e.target.value)
                            }} ref={inputRef}/>
                            <button type='submit' onMouseDown={()=>{handleUpdatePalette(editedName)}}>update</button>
                        </form>
                    }
                    <div className='saved-palette-options'>
                        <button><span className="fa-solid fa-file-export"></span></button>
                        <button onClick={()=>{setIsBeingEdited(true)}}><span className="fa-solid fa-pen-to-square"></span></button>
                        <button
                        onClick={()=>{setIsDeleteModalOpen(true)}}><span className="fa-regular fa-trash-can"></span></button>
                    </div>
                    <div className="palette-sprites-container">
                    {
                        uniqueSprites.map((image, imageIndex) => {
                            return (
                                <img
                                src={image}
                                key={imageIndex}
                                alt='Sprite of a source Pokémon for the palette'
                                loading='lazy'
                                ></img>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}