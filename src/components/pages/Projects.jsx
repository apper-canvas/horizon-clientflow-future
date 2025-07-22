import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { useClients } from "@/hooks/useClients";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ProjectCard from "@/components/organisms/ProjectCard";
import ProjectForm from "@/components/organisms/ProjectForm";
import Modal from "@/components/organisms/Modal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Projects = () => {
  const { projects, loading: projectsLoading, error: projectsError, loadProjects, addProject, updateProject, deleteProject } = useProjects();
  const { clients } = useClients();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddProject = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleSubmit = async (projectData) => {
    try {
      setIsSubmitting(true);
      
      if (editingProject) {
        await updateProject(editingProject.Id, projectData);
        toast.success("Project updated successfully");
      } else {
        await addProject(projectData);
        toast.success("Project added successfully");
      }
      
      setShowModal(false);
      setEditingProject(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
        toast.success("Project deleted successfully");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const getClientById = (clientId) => {
    return clients.find(c => c.Id === clientId);
  };

  const statusOptions = ["All", "Active", "On Hold", "Completed"];

  if (projectsLoading) {
    return <Loading type="grid" />;
  }

  if (projectsError) {
    return <Error message={projectsError} onRetry={loadProjects} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Track your active projects and progress</p>
        </div>
        
        <Button onClick={handleAddProject} className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Filters */}
      {projects.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search projects..."
            className="w-full sm:w-96"
          />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="text-sm text-gray-500">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                client={getClientById(project.clientId)}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : projects.length > 0 ? (
        <div className="text-center py-12">
          <ApperIcon name="Search" className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No projects match your search</p>
        </div>
      ) : (
        <Empty
          type="projects"
          onAction={handleAddProject}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProject ? "Edit Project" : "Add New Project"}
      >
        <ProjectForm
          project={editingProject}
          clients={clients}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default Projects;