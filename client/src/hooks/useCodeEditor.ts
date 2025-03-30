import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

export function useCodeEditor() {
  const getLangExtension = (language: string) => {
    switch (language) {
      case "html":
        return html();
      case "css":
        return css();
      case "javascript":
        return javascript();
      default:
        return javascript();
    }
  };

  return { getLangExtension };
}
