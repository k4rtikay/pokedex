import { usePokedex } from "../../Context/PokedexContext";
import PokecardDesktop from "../Pokecard/PokecardDesktop";
import SidenavDesktop from "../Sidenav/SidenavDesktop";
import './MainAppLayout.scss'

export default function DesktopLayout(){
    const {isModalOpen, setIsModalOpen, selectedPokemon} = usePokedex()

    return(
        <div className="dl-container">
            <SidenavDesktop></SidenavDesktop>
            <PokecardDesktop selectedPokemon={selectedPokemon}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}/>
        </div>
    )
}