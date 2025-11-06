import { motion } from "framer-motion";
import { usePokedex } from "../../Context/PokedexContext";
import './MainAppLayout.scss'
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

export default function MainAppLayout() {
    const { isDesktop } = usePokedex();

    

    return(
        <motion.div
        initial={{
            opacity: 0.3,
            filter: "blur(10px)"
        }}
        animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition:{
                type: 'spring',
                stiffness: 120,
                damping: 25
            }
        }
        }
        exit={{
            opacity: 0.3,
            filter: "blur(5px)",            
        }}
        style={{flexGrow:'1', display: 'flex', flexDirection: 'column'}}>
            <div className='app'>
                {isDesktop?<DesktopLayout/>:<MobileLayout/>}
            </div>
        </motion.div>
    )

}