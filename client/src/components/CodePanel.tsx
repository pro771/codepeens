import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { useCodeEditor } from "@/hooks/useCodeEditor";
import { Eye } from "lucide-react";

interface CodePanelProps {
  language: "html" | "css" | "javascript";
  value: string;
  onChange: (value: string) => void;
  onError?: (message: string) => void;
}

const CodePanel = ({ language, value, onChange, onError }: CodePanelProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const { getLangExtension } = useCodeEditor();
  
  // Set up editor when component mounts
  useEffect(() => {
    if (!editorRef.current) return;
    
    const langExtension = getLangExtension(language);
    
    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        langExtension,
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
    });
    
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
    
    editorViewRef.current = view;
    
    return () => {
      view.destroy();
    };
  }, [language]);
  
  // Update editor content when value prop changes
  useEffect(() => {
    const view = editorViewRef.current;
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value }
      });
    }
  }, [value]);
  
  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center">
          {language === "html" && (
            <svg className="h-4 w-4 text-orange-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 9.5V6.5C16.5 5.4 15.6 4.5 14.5 4.5H6.5C5.4 4.5 4.5 5.4 4.5 6.5V17.5C4.5 18.6 5.4 19.5 6.5 19.5H14.5C15.6 19.5 16.5 18.6 16.5 17.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.5 15L17 12.5L14.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 12.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 8.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 11.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 14.5H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          
          {language === "css" && (
            <svg className="h-4 w-4 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 8V4C7 2.9 7.9 2 9 2H20C21.1 2 22 2.9 22 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 16V20C7 21.1 7.9 22 9 22H20C21.1 22 22 21.1 22 20V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          
          {language === "javascript" && (
            <svg className="h-4 w-4 text-yellow-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10V16C5 20 7 22 11 22H13C17 22 19 20 19 16V10C19 6 17 4 13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 14V16C13 17.1 12.1 18 11 18V16C11 14.9 11.9 14 13 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 10V9C5 7.9 5.9 7 7 7H9C10.1 7 11 7.9 11 9V10C11 11.1 10.1 12 9 12H7C5.9 12 5 11.1 5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 4V8L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          
          <span className="font-medium capitalize">{language}</span>
        </div>
        
        <div className="flex items-center text-zinc-400">
          <button className="hover:text-white">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div ref={editorRef} className="h-full" />
      </div>
    </div>
  );
};

export default CodePanel;
