import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/molecules/StatusBadge";
import Select from "@/components/atoms/Select";

const TaskItem = ({ task, project, onStatusChange, onEdit, onDelete }) => {
const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Done";
  
  const statusOptions = ["To Do", "In Progress", "Review", "Done"];

  const handleStatusChange = (newStatus) => {
    onStatusChange?.(task.Id, newStatus);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      className="card p-4 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className={`p-2 rounded-lg ${
            task.status === "Done" ? "bg-green-100" : "bg-gray-100"
          }`}>
            <ApperIcon 
              name={task.status === "Done" ? "CheckCircle" : "Circle"} 
              className={`h-4 w-4 ${
                task.status === "Done" ? "text-green-600" : "text-gray-500"
              }`} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`font-medium ${
                task.status === "Done" ? "line-through text-gray-500" : "text-gray-900"
              }`}>
                {task.title}
              </h3>
              <StatusBadge status={task.status} />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Project: {project?.title || "Unknown Project"}</span>
              <div className={`flex items-center space-x-1 ${
                isOverdue ? "text-red-600" : ""
              }`}>
                <ApperIcon name="Calendar" className="h-3 w-3" />
                <span>{format(new Date(task.dueDate), "MMM dd")}</span>
                {isOverdue && <ApperIcon name="AlertTriangle" className="h-3 w-3 text-red-500" />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-sm py-1 px-2 min-w-[120px]"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(task)}
              className="p-2"
            >
              <ApperIcon name="Edit2" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(task.Id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <ApperIcon name="Trash2" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;