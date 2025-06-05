import './Header.css'

export function Header({isSideMenuOpen,setIsSideMenuOpen}){
    return(
        <div className="sideNavHeader">
            <button
            className='menu-button'
            onClick={()=>{setIsSideMenuOpen(!isSideMenuOpen)}}>{!isSideMenuOpen?<i class="fa-solid fa-bars"></i>:<i class="fa-solid fa-arrow-left"></i>}</button>
            <h1>Pokédex</h1>
            <div className="sideNavHeader-buttons">
                <button className="darkModeBtn"
                onClick={()=>{
                    {document.querySelector('body').classList.toggle('darkmode')};
                }}><i class="fa-regular fa-lightbulb"></i>
                </button>
                <button className="userButton">Login</button>
            </div>
        </div>
    )
}