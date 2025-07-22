import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/molecules/StatusBadge";

const ClientCard = ({ client, onEdit, onDelete }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="card p-6 group"
    >
<div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-3 rounded-full text-white font-bold text-sm">
            {getInitials(client.name)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-600">{client.company}</p>
            <div className="mt-1">
              <StatusBadge status={client.status || "Active"} />
            </div>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(client)}
            className="p-2"
          >
            <ApperIcon name="Edit2" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(client.Id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="Phone" className="h-4 w-4 mr-2" />
          <span>{client.phone}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Added {new Date(client.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center text-xs text-primary-600">
            <ApperIcon name="Building" className="h-3 w-3 mr-1" />
            <span>Client</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientCard;