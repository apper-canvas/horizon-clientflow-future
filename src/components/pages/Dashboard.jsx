import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useClients } from "@/hooks/useClients";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import StatsCards from "@/components/organisms/StatsCards";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const Dashboard = () => {
  const { clients, loading: clientsLoading } = useClients();
  const { projects, loading: projectsLoading } = useProjects();
  const { tasks, loading: tasksLoading } = useTasks();

  const loading = clientsLoading || projectsLoading || tasksLoading;

  const stats = {
    activeProjects: projects.filter(p => p.status === "Active").length,
    pendingTasks: tasks.filter(t => t.status !== "Done").length,
    totalClients: clients.length
  };

  const recentActivity = [
    {
      id: 1,
      type: "project",
      title: "Website Redesign project updated",
      time: "2 hours ago",
      icon: "Briefcase",
      color: "blue"
    },
    {
      id: 2,
      type: "task",
      title: "New task added to Mobile App Development",
      time: "4 hours ago",
      icon: "CheckSquare",
      color: "green"
    },
    {
      id: 3,
      type: "client",
      title: "New client Sarah Johnson added",
      time: "1 day ago",
      icon: "Users",
      color: "purple"
    }
  ];

  if (loading) {
    return <Loading type="dashboard" />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-primary p-3 rounded-full">
            <ApperIcon name="Zap" className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back to ClientFlow</h1>
            <p className="text-gray-600">Here's what's happening with your freelance business today</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="bg-gradient-to-r from-primary-100 to-secondary-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-primary-700">Live</span>
          </div>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className={`p-2 rounded-full ${
                activity.color === "blue" ? "bg-blue-100" :
                activity.color === "green" ? "bg-green-100" :
                "bg-purple-100"
              }`}>
                <ApperIcon 
                  name={activity.icon} 
                  className={`h-4 w-4 ${
                    activity.color === "blue" ? "text-blue-600" :
                    activity.color === "green" ? "text-green-600" :
                    "text-purple-600"
                  }`} 
                />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {recentActivity.length === 0 && (
          <div className="text-center py-12">
            <ApperIcon name="Activity" className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="card p-4 hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <ApperIcon name="UserPlus" className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Add New Client</p>
              <p className="text-xs text-gray-500">Expand your network</p>
            </div>
          </div>
        </div>

        <div className="card p-4 hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <ApperIcon name="Plus" className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Start New Project</p>
              <p className="text-xs text-gray-500">Begin tracking progress</p>
            </div>
          </div>
        </div>

        <div className="card p-4 hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <ApperIcon name="CheckSquare" className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Create Task</p>
              <p className="text-xs text-gray-500">Stay organized</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;