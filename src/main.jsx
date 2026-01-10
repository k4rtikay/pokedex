import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { PokedexProvider } from "./Context/PokedexContext.jsx";
import { DatabaseProvider } from "./Context/DatabaseContext.jsx";
import * as Tooltip from "@radix-ui/react-tooltip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PokedexProvider>
        <DatabaseProvider>
          <Tooltip.Provider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Tooltip.Provider>
        </DatabaseProvider>
      </PokedexProvider>
    </AuthProvider>
  </StrictMode>
);
