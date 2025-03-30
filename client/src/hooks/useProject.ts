import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { initialHtml, initialCss, initialJs } from "@/utils/initialCode";

export interface ProjectData {
  id?: number;
  name: string;
  html: string;
  css: string;
  javascript: string;
}

export function useProject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  // Get all projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
    retry: false
  });

  // Get a specific project
  const getProject = (id: number) => {
    return useQuery({
      queryKey: ['/api/projects', id],
      enabled: !!id
    });
  };

  // Create a new project
  const createProjectMutation = useMutation({
    mutationFn: async (project: ProjectData) => {
      const defaultProject = {
        name: project.name || "Untitled Project",
        html: project.html || initialHtml,
        css: project.css || initialCss,
        javascript: project.javascript || initialJs,
        userId: 1 // Default user ID since we don't have auth
      };
      
      const res = await apiRequest("POST", "/api/projects", defaultProject);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      navigate(`/editor/${data.id}`);
      return data;
    },
    onError: (error) => {
      toast({
        title: "Failed to create project",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update an existing project
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, ...project }: ProjectData & { id: number }) => {
      const res = await apiRequest("PUT", `/api/projects/${id}`, project);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects', data.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      return data;
    },
    onError: (error) => {
      toast({
        title: "Failed to update project",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Delete a project
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Failed to delete project",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Helper functions
  const createNewProject = async () => {
    const project = await createProjectMutation.mutateAsync({
      name: "Untitled Project",
      html: initialHtml,
      css: initialCss,
      javascript: initialJs
    });
    return project;
  };

  const saveProject = async (project: ProjectData) => {
    if (project.id) {
      // Update existing project
      return await updateProjectMutation.mutateAsync({
        id: project.id,
        html: project.html,
        css: project.css,
        javascript: project.javascript
      });
    } else {
      // Create new project
      return await createProjectMutation.mutateAsync(project);
    }
  };

  const deleteProject = async (id: number) => {
    return await deleteProjectMutation.mutateAsync(id);
  };

  const loadProjects = async () => {
    return projects;
  };

  return {
    projects,
    isLoading,
    getProject,
    createNewProject,
    saveProject,
    deleteProject,
    loadProjects
  };
}
