import {createPortal} from 'react-dom'
import './Modal.css'

export function Modal({isModalOpen, onClose, children}){
    if(isModalOpen==false) return

    return createPortal(
        <div className={`modalContainer ${isModalOpen?' open':''}`}>
            <button onClick={onClose} className='modal-underlay'></button>
            <div className="moveModal">
                {children}
            </div>
        </div>, document.querySelector('#modal-root')
    )
}