import { usePokedex } from "../../Context/PokedexContext";
import "./Export.scss";
import { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  gruvboxDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ColorTooltip } from "../palette/Toast";
import { handleDownload, handleCodeFormatting } from "../../utils";

export default function Export({ colorArray, name }) {
  const [copied, setCopied] = useState(false);

  const { isDarkMode } = usePokedex();

  const fullCodeString = handleCodeFormatting(colorArray);

  const codeRef = useRef();

  const handleCodeCopy = () => {
    try {
      if (codeRef.current) {
        setCopied(true);
        const codeString = codeRef.current.innerText;
        navigator.clipboard.writeText(codeString);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }
    } catch (err) {
      console.error("failed to copy color to clipboard : ", err);
    }
  };

  console.log(colorArray);

  return (
    <div className="export">
      <header>
        <p>Export as Code</p>
      </header>

      <div className="code-container">
        <SyntaxHighlighter
          language="javascript"
          style={isDarkMode ? gruvboxDark : materialLight}
          customStyle={{ margin: 0 }}
          ref={codeRef}
        >
          {fullCodeString}
        </SyntaxHighlighter>
      </div>

      <span className="export-actions">
        <button className="export-actions-btn" onClick={handleCodeCopy}>
          Copy
        </button>
        <button
          className="export-actions-btn download"
          onClick={() => handleDownload(fullCodeString, name)}
        >
          Download
        </button>
      </span>

      {copied && (
        <ColorTooltip
          text={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              <span className="material-symbols-rounded">check_circle</span> Copied
              to clipboard!
            </div>
          }
        />
      )}
    </div>
  );
}
