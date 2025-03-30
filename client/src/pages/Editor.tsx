import { useEffect, useState } from "react";
import { useParams } from "wouter";
import Editor from "@/components/Editor";
import Header from "@/components/Header";
import { useProject } from "@/hooks/useProject";
import { initialHtml, initialCss, initialJs } from "@/utils/initialCode";
import { useToast } from "@/hooks/use-toast";

const EditorPage = () => {
  const params = useParams<{ id?: string }>();
  const projectId = params.id ? parseInt(params.id) : undefined;
  const { toast } = useToast();
  
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [isLoading, setIsLoading] = useState(false);
  
  const { getProject } = useProject();
  
  const { data: project } = getProject(projectId as number);
  
  useEffect(() => {
    if (project) {
      setHtml(project.html || initialHtml);
      setCss(project.css || initialCss);
      setJs(project.javascript || initialJs);
    }
  }, [project]);
  
  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white">
      <Header />
      <Editor 
        initialHtml={html} 
        initialCss={css} 
        initialJs={js} 
        projectId={projectId}
      />
    </div>
  );
};

export default EditorPage;
