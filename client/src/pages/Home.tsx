import { useEffect, useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { Plus, FileCode, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Project {
  id: number;
  name: string;
  updatedAt: string;
}

const HomePage = () => {
  const { projects, isLoading, createNewProject, deleteProject } = useProject();
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    if (projects) {
      setUserProjects(projects);
    }
  }, [projects]);
  
  const handleDeleteProject = async (id: number) => {
    await deleteProject(id);
  };
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Projects</h1>
          <Link href="/editor">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Project Card */}
            <Card className="bg-zinc-800 border-zinc-700 hover:border-indigo-500 transition-colors cursor-pointer">
              <Link href="/editor">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-white">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-center justify-center border border-dashed border-zinc-700 rounded-md">
                    <span className="text-zinc-500">Start a new coding project</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
            
            {/* Project List */}
            {userProjects?.map((project) => (
              <Card key={project.id} className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-colors">
                <Link href={`/editor/${project.id}`}>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-white">
                      <FileCode className="h-5 w-5 mr-2" />
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Updated {formatDistanceToNow(new Date(project.updatedAt))} ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-zinc-900 rounded-md overflow-hidden">
                      {/* Project preview would go here */}
                      <div className="h-full flex items-center justify-center">
                        <span className="text-zinc-500">Project Preview</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="flex justify-between">
                  <Link href={`/editor/${project.id}`}>
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700">
                      Edit
                    </Button>
                  </Link>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="border-zinc-700 hover:bg-red-900/20 hover:text-red-500 hover:border-red-900">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this project and all of its contents.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteProject(project.id);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {!isLoading && userProjects?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-zinc-400 mb-4">You don't have any projects yet.</div>
            <Link href="/editor">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Create Your First Project
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
