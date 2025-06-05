import {createPortal} from 'react-dom'
import './PaletteModal.css'

export function PaletteModal({onClose,isPaletteModalOpen,children, imgRef}){
    if(isPaletteModalOpen==false) return


    return createPortal(
        <div className={`paletteModalContainer ${isPaletteModalOpen?' open':''}`}>
            <button onClick={onClose} className='palette-modal-underlay'></button>
            <div className="paletteModal">
                {children}
            </div>
        </div>, document.querySelector('#modal-root')
    )
}