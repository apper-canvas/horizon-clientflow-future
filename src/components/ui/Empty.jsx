import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item", 
  icon = "Plus",
  actionLabel = "Add New",
  onAction,
  type = "default"
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case "clients":
        return {
          title: "No clients yet",
          description: "Start building your client base by adding your first client",
          icon: "Users",
          actionLabel: "Add Client"
        };
      case "projects":
        return {
          title: "No projects yet",
          description: "Create your first project to start tracking progress",
          icon: "Briefcase",
          actionLabel: "Add Project"
        };
      case "tasks":
        return {
          title: "No tasks yet",
          description: "Add tasks to keep track of your project progress",
          icon: "CheckSquare",
          actionLabel: "Add Task"
        };
      default:
        return { title, description, icon, actionLabel };
    }
  };

  const config = getEmptyConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-16 text-center"
    >
      <div className="bg-gradient-primary p-6 rounded-full mb-6 shadow-card">
        <ApperIcon name={config.icon} className="h-12 w-12 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-600 mb-8 max-w-md">{config.description}</p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="btn-primary flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>{config.actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;