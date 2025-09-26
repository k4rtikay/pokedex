import { usePokedex } from "../../Context/PokedexContext";
import { Pokecard } from "../Pokecard/Pokecard";
import SidenavDesktop from "../Sidenav/SidenavDesktop";
import './MainAppLayout.scss'

export default function DesktopLayout(){
    const {isModalOpen, setIsModalOpen, selectedPokemon} = usePokedex()

    return(
        <div className="dl-container">
            <SidenavDesktop></SidenavDesktop>
            <Pokecard selectedPokemon={selectedPokemon}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}/>
        </div>
    )
}