import { useNavigate } from 'react-router-dom'
import './Landing.scss'
import './google-sign-in.css'
import { motion } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { Header } from '../Header/Header';

export default function Landing(){

    const navigate = useNavigate();
    const { googleSignIn } = useAuth()

    return(
        <motion.div
        initial={{
            transition:{
                type: 'spring',
                stiffness: 120,
                damping: 25
            }            
        }}
        exit={{
            opacity: 0.3,
            filter: "blur(5px)"
        }}>
            <Header></Header>
            <div className="lp-container">
                <div className="lp-content">
                    <div className="lp-image-container">
                        <img src="pokemon-palette.png" alt="image of color palette from the pokemon pikachu" className="lp-image--primary" />
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="sprite art of pikachu" className="lp-image--secondary" />
                    </div>
                    <div className="lp-text">
                        {/* <h1 className='fade-in'>PokéBook</h1> */}
                        <h1 className='lp-title'>POKÉMON <span className='lp-title--stylized'>
                            <span>C</span>
                            <span>O</span>
                            <span>L</span>
                            <span>O</span>
                            <span>R</span>
                            <span>S</span></span> FOR CREATIVE PROJECTS.</h1>
                        <p className='lp-subtitle'>Where Pokémon meets professional design tools</p>
                    </div>
                    <div className="lp-actions">
                        <button className='lp-actions--primary'>Start Creating</button>
                        <button className='lp-actions--secondary'>Sign In</button>
                    </div>
                    <div className="lp-list-wrapper">
                        <ul className="lp-list">
                            <li className='lp-list--item'><span className="lp-list--icon material-symbols-rounded">lock</span> Advanced Color Locking</li>
                            <li className='lp-list--item'><span className="lp-list--icon material-symbols-rounded">looks</span> 20-Shade Color Explorer</li>
                            <li className='lp-list--item'><span className="lp-list--icon material-symbols-rounded">casino</span> Spacebar Generation</li>
                            <li className='lp-list--item'><span className="lp-list--icon material-symbols-rounded">bookmark_heart</span> Smart Palette Management</li>
                            <li className='lp-list--item'><span className="lp-list--icon material-symbols-rounded">ios_share</span> Designer-Ready Export</li>
                            <li className='lp-list--item'><span className="lp-list--icon material-symbols-rounded">family_star</span> Animated Sprite Integration</li>
                        </ul>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}