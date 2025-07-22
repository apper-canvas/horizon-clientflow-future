import { useState, useEffect } from "react";
import { projectService } from "@/services/api/projectService";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async (projectData) => {
    try {
      const newProject = await projectService.create(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      throw new Error(err.message || "Failed to add project");
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const updatedProject = await projectService.update(id, projectData);
      setProjects(prev => prev.map(p => p.Id === parseInt(id) ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      throw new Error(err.message || "Failed to update project");
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectService.delete(id);
      setProjects(prev => prev.filter(p => p.Id !== parseInt(id)));
    } catch (err) {
      throw new Error(err.message || "Failed to delete project");
    }
  };

  return {
    projects,
    loading,
    error,
    loadProjects,
    addProject,
    updateProject,
    deleteProject
  };
};