import { Sidenav } from "../Sidenav/Sidenav";
import { usePokedex } from "../../Context/PokedexContext";
import { Pokecard } from "../Pokecard/Pokecard";

export default function DesktopLayout(){
    const {isModalOpen, setIsModalOpen, selectedPokemon} = usePokedex()

    return(
        <div>
            <Sidenav></Sidenav>
            {/* <Pokecard selectedPokemon={selectedPokemon}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen} /> */}
        </div>
    )
}