import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useProject } from "@/hooks/useProject";
import { Plus, Save, Download, Settings, Grid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { createNewProject, loadProjects } = useProject();
  const { toast } = useToast();
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);

  const handleNewProject = async () => {
    try {
      const project = await createNewProject();
      toast({
        title: "Project Created",
        description: "Starting with a blank project"
      });
      return project;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new project",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="bg-zinc-950 border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <svg className="h-8 w-8 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.89001 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.89 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 11.11H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="ml-2 text-xl font-semibold text-white">CodeCraft</span>
              </div>
            </Link>
          </div>

          {/* Center Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/editor">
              <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
                  <Grid className="h-4 w-4 mr-2" />
                  Projects
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
                <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                  <Link href="/editor">Create New Project</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                  <Link href="/">My Projects</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            
            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <span className="font-medium text-sm">CC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
