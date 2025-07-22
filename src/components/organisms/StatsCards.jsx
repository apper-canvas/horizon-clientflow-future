import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const StatsCards = ({ stats }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const statsConfig = [
    {
      key: "activeProjects",
      title: "Active Projects",
      icon: "Briefcase",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      key: "pendingTasks",
      title: "Pending Tasks",
      icon: "Clock",
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-50 to-amber-100"
    },
    {
      key: "totalClients",
      title: "Total Clients",
      icon: "Users",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsConfig.map((config, index) => (
        <motion.div
          key={config.key}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{config.title}</h3>
            <div className={`bg-gradient-to-br ${config.bgGradient} p-2 rounded-lg`}>
              <ApperIcon name={config.icon} className={`h-5 w-5 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`} />
            </div>
          </div>
          
          <div className="mb-2">
            <span className={`text-3xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
              {stats[config.key] || 0}
            </span>
          </div>
          
          <p className="text-xs text-gray-500">
            {config.key === "activeProjects" && "Projects in progress"}
            {config.key === "pendingTasks" && "Tasks to complete"}
            {config.key === "totalClients" && "Registered clients"}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;