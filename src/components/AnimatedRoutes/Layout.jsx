import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { usePokedex } from "../../Context/PokedexContext";

export default function Layout(){
    const {isSideMenuOpen, setIsSideMenuOpen} = usePokedex();

    return(
        <>
        <Header isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen}/>
        <main>
            <Outlet/>
        </main>
        </>
    )
}