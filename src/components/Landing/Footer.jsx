import "./footer.scss";
import { useNavigate } from "react-router-dom";

export function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="landing-footer">
            <div className="pokemon-color-stripe-container">
                <div className="pokemon-color-stripe"
                    style={{
                        backgroundColor: "#ffcb05"
                    }}
                ></div>
                <div className="pokemon-color-stripe"
                    style={{
                        backgroundColor: "#2a75bb"
                    }}
                ></div>
            </div>
            <div className="footer-cta">
                <h2>Start creating with Pokémon colors today.</h2>
                <p>Generate, customize, and export palettes in seconds.</p>
                <button onClick={() => navigate("/app")}>Start Creating</button>
            </div>
            <div className="footer-links">
                <div>
                    <h3>Product</h3>
                    <ul>
                        <li><a href="#" rel="noopener noreferrer" target="_blank" onClick={() => navigate("/")}>Home</a></li>
                        <li><a href="https://github.com/k4rtikay/pokedex/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen" rel="noopener noreferrer" target="_blank">Issues</a></li>
                        <li><a href="https://github.com/k4rtikay/pokedex" rel="noopener noreferrer" target="_blank">Repository</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Links</h3>
                    <ul>
                        <li><a href="https://x.com/br1dge_" rel="noopener noreferrer" target="_blank">X/Twitter</a></li>
                        <li><a href="https://github.com/k4rtikay" rel="noopener noreferrer" target="_blank">GitHub</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="https://github.com/k4rtikay/pokedex/blob/main/LICENSE" rel="noopener noreferrer" target="_blank">License</a></li>
                        <li><a href="https://github.com/k4rtikay/pokedex/blob/main/README.md" rel="noopener noreferrer" target="_blank">README</a></li>
                    </ul>
                </div>
            </div>
            <p className="footer-copyright">© 2025 Huedex. All rights reserved.</p>
        </footer>
    );
}