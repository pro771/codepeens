import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Expand, Play } from "lucide-react";

interface PreviewProps {
  content: string;
  autoUpdate: boolean;
}

const Preview = ({ content, autoUpdate }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevContent, setPrevContent] = useState(content);
  
  // Update preview when content changes (if autoUpdate is enabled)
  useEffect(() => {
    if (autoUpdate) {
      updatePreview();
    }
    setPrevContent(content);
  }, [content, autoUpdate]);

  const updatePreview = () => {
    if (!iframeRef.current) return;
    
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (doc) {
      doc.open();
      doc.write(content);
      doc.close();
    }
  };

  const handleRunClick = () => {
    updatePreview();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case "tablet":
        return "w-[768px] mx-auto h-full border-x border-zinc-800";
      case "mobile":
        return "w-[390px] mx-auto h-full border-x border-zinc-800";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className={`flex flex-col h-full bg-zinc-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center">
          <svg className="h-4 w-4 text-indigo-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.67001 18.95L7.60001 15.64C8.39001 15.11 9.53001 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-medium">Preview</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRunClick}
            className="px-3 py-1 h-8 bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
          >
            <Play className="h-3 w-3 mr-1" />
            Run
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="px-3 py-1 h-8 bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
          >
            <Expand className="h-3 w-3 mr-1" />
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
          
          <Select value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <SelectTrigger className="h-8 w-28 bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Viewport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex-1 bg-white overflow-auto">
        <div className={getViewportClass()}>
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
