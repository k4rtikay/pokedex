import { usePokedex } from "../../Context/PokedexContext";
import { Pokecard } from "../Pokecard/Pokecard";

export default function MobileLayout() {
  const { isModalOpen, setIsModalOpen, selectedPokemon } = usePokedex();

  return (
    <Pokecard
      selectedPokemon={selectedPokemon}
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
    />
  );
}
