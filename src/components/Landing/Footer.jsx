import "./footer.scss";
import { useNavigate } from "react-router-dom";

export function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="landing-footer">
            <div className="footer-cta">
                <h2>Start creating with Pokémon colors today.</h2>
                <p>Generate, customize, and export palettes in seconds.</p>
                <button onClick={() => navigate("/create")}>Start Creating</button>
            </div>
            <div className="footer-links">
                <div>
                    <h3>Product</h3>
                    <ul>
                        <li><a href="#" rel="noopener noreferrer" target="_blank" onClick={() => navigate("/")}>Home</a></li>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">Features</a></li>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">Issues</a></li>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">Repository</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">X/Twitter</a></li>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">GitHub</a></li>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">Terms</a></li>
                        <li><a href="#" rel="noopener noreferrer" target="_blank">Privacy</a></li>
                    </ul>
                </div>
            </div>
            <p className="footer-copyright">© 2025 Huedex. All rights reserved.</p>
        </footer>
    );
}