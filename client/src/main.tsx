import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Custom CSS for CodeMirror to match design
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  /* Custom scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #1E1E1E;
  }
  ::-webkit-scrollbar-thumb {
    background: #3E3E3E;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* CodeMirror customizations */
  .cm-editor {
    height: 100%;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
  }
  
  /* Adjusting panel sizes */
  .panel-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 8rem);
  }
  
  .CodeMirror {
    height: 100%;
  }
  
  .CodeMirror-gutters {
    background: #252526;
    border-right: 1px solid #3E3E3E;
  }
  
  .CodeMirror-linenumber {
    color: #6b7280;
  }
`;
document.head.appendChild(globalStyle);

createRoot(document.getElementById("root")!).render(<App />);
