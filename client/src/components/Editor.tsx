import { useState, useEffect } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useToast } from "@/hooks/use-toast";
import CodePanel from "./CodePanel";
import Preview from "./Preview";
import StatusBar from "./StatusBar";
import { useProject } from "@/hooks/useProject";
import { useParams } from "wouter";

interface EditorProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  projectId?: number;
}

const Editor = ({ initialHtml = "", initialCss = "", initialJs = "" }: EditorProps) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const { saveProject } = useProject();
  const { toast } = useToast();
  const params = useParams();
  const projectId = params.id ? parseInt(params.id) : undefined;

  // Auto-save functionality (every 30 seconds)
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      handleSave();
    }, 30000);

    return () => clearTimeout(saveTimer);
  }, [html, css, js]);

  // Generate content for preview
  const generatePreviewContent = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (error) {
      console.error('JavaScript Error:', error.message);
      const errorDiv = document.createElement('div');
      errorDiv.style.position = 'fixed';
      errorDiv.style.bottom = '0';
      errorDiv.style.left = '0';
      errorDiv.style.right = '0';
      errorDiv.style.padding = '8px';
      errorDiv.style.background = '#f44336';
      errorDiv.style.color = 'white';
      errorDiv.style.fontFamily = 'sans-serif';
      errorDiv.style.zIndex = '9999';
      errorDiv.textContent = 'JavaScript Error: ' + error.message;
      document.body.appendChild(errorDiv);
    }
  </script>
</body>
</html>
    `;
  };

  const handleSave = async () => {
    try {
      await saveProject({
        id: projectId,
        name: "Untitled Project",
        html,
        css,
        javascript: js,
      });
      
      toast({
        title: "Project saved",
        description: "Your project has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving your project",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const content = generatePreviewContent();
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleError = (message: string) => {
    setErrors((prev) => [...prev, message]);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50} minSize={20}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={33} minSize={20}>
                <CodePanel 
                  language="html" 
                  value={html} 
                  onChange={setHtml} 
                  onError={handleError} 
                />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={33} minSize={20}>
                <CodePanel 
                  language="css" 
                  value={css} 
                  onChange={setCss} 
                  onError={handleError} 
                />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={33} minSize={20}>
                <CodePanel 
                  language="javascript" 
                  value={js} 
                  onChange={setJs} 
                  onError={handleError} 
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={20}>
            <Preview 
              content={generatePreviewContent()} 
              autoUpdate={autoUpdate} 
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      <StatusBar 
        htmlLength={html.split('\n').length}
        cssLength={css.split('\n').length}
        jsLength={js.split('\n').length}
        autoUpdate={autoUpdate}
        onAutoUpdateChange={setAutoUpdate}
        errors={errors}
        onClearErrors={clearErrors}
        onSave={handleSave}
        onExport={handleExport}
      />
    </div>
  );
};

export default Editor;
