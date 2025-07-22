import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/molecules/StatusBadge";

const ProjectCard = ({ project, client, onEdit, onDelete }) => {
  const isOverdue = new Date(project.deadline) < new Date() && project.status !== "Completed";
  
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "Play";
      case "on hold":
        return "Pause";
      case "completed":
        return "CheckCircle";
      default:
        return "Circle";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="card p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900">{project.title}</h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Client: {client?.name || "Unknown Client"}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(project)}
            className="p-2"
          >
            <ApperIcon name="Edit2" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(project.Id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <ApperIcon name={getStatusIcon(project.status)} className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">{project.status}</span>
        </div>
        
        <div className={`flex items-center space-x-1 text-xs ${
          isOverdue ? "text-red-600" : "text-gray-500"
        }`}>
          <ApperIcon name="Calendar" className="h-3 w-3" />
          <span>{format(new Date(project.deadline), "MMM dd, yyyy")}</span>
          {isOverdue && <ApperIcon name="AlertTriangle" className="h-3 w-3 text-red-500" />}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;