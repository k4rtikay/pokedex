import {createPortal} from 'react-dom'
import './Modal.css'
import { motion, AnimatePresence, easeIn } from 'framer-motion'

export function Modal({isModalOpen, onClose, children}){

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, transition: {duration: 0.3, ease: [0.68, -0.6, 0.32, 1.35]} },
        visible: { opacity: 1, scale: 1, transition: {duration: 0.3, ease: [0.68, -0.6, 0.32, 1.35]} }
    }

    const blurVariants = {
        hidden: {opacity:0, transition: {easeIn}},
        visible: {opacity:1, transition: {easeIn}}
    }

    return createPortal(
        <AnimatePresence>
            {isModalOpen && (
                <motion.div className={`modalContainer`}
                variants={blurVariants}
                initial={'hidden'}
                animate={'visible'}
                exit={'hidden'}>
                <button onClick={onClose} className='modal-underlay'></button>
                <motion.div className="moveModal"
                variants={modalVariants}
                initial={'hidden'}
                animate={'visible'}
                exit={'hidden'}
                key={'modal'}>
                    {children}
                </motion.div>
            </motion.div>
            )} 
        </AnimatePresence>,document.querySelector('#modal-root')
    )
}