import './Header.css'

export function Header({isSideMenuOpen,setIsSideMenuOpen}){
    return(
        <div className="sideNavHeader">
            <button
            className='menu-button'
            onClick={()=>{setIsSideMenuOpen(!isSideMenuOpen)}}>{!isSideMenuOpen?<i className="fa-solid fa-bars"></i>:<i className="fa-solid fa-arrow-left"></i>}</button>
            <h1>Pokédex</h1>
            <div className="sideNavHeader-buttons">
                <button className="darkModeBtn"
                onClick={()=>{
                    {document.querySelector('body').classList.toggle('darkmode')};
                }}><i className="fa-regular fa-lightbulb"></i>
                </button>
                <button className="userButton">Login</button>
            </div>
        </div>
    )
}