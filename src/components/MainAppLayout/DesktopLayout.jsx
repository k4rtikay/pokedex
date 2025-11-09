import { usePokedex } from "../../Context/PokedexContext";
import PokecardDesktop from "../Pokecard/PokecardDesktop";
import SidenavDesktop from "../Sidenav/SidenavDesktop";
import { Sidenav } from "../Sidenav/Sidenav";
import "./MainAppLayout.scss";

export default function DesktopLayout() {
  const { isModalOpen, setIsModalOpen, selectedPokemon } = usePokedex();

  return (
    <>
      <SidenavDesktop />
      <PokecardDesktop
        selectedPokemon={selectedPokemon}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
}
