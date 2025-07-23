import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import TaskItem from "@/components/organisms/TaskItem";
import TaskForm from "@/components/organisms/TaskForm";
import Modal from "@/components/organisms/Modal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Tasks = () => {
  const { tasks, loading: tasksLoading, error: tasksError, loadTasks, addTask, updateTask, updateTaskStatus, deleteTask } = useTasks();
  const { projects } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSubmit = async (taskData) => {
    try {
      setIsSubmitting(true);
      
      if (editingTask) {
        await updateTask(editingTask.Id, taskData);
        toast.success("Task updated successfully");
      } else {
        await addTask(taskData);
        toast.success("Task added successfully");
      }
      
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success(`Task status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        toast.success("Task deleted successfully");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const getProjectById = (projectId) => {
    return projects.find(p => p.Id === projectId);
};

  const statusOptions = ["All", "To Do", "In Progress", "Review", "Done"];

  const getStatusStats = () => {
    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === "To Do").length,
      inProgress: tasks.filter(t => t.status === "In Progress").length,
      review: tasks.filter(t => t.status === "Review").length,
      done: tasks.filter(t => t.status === "Done").length
    };
    return stats;
  };

  const stats = getStatusStats();

  if (tasksLoading) {
    return <Loading type="list" />;
  }

  if (tasksError) {
    return <Error message={tasksError} onRetry={loadTasks} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage your project tasks and progress</p>
        </div>
        
        <Button onClick={handleAddTask} className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total</span>
              <ApperIcon name="List" className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">To Do</span>
              <ApperIcon name="Circle" className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-500">{stats.todo}</div>
          </div>
<div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-600">In Progress</span>
              <ApperIcon name="Clock" className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.inProgress}</div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-600">Review</span>
              <ApperIcon name="Eye" className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.review}</div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">Done</span>
              <ApperIcon name="CheckCircle" className="h-4 w-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.done}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      {tasks.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search tasks..."
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
              {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TaskItem
                task={task}
                project={getProjectById(task.projectId)}
                onStatusChange={handleStatusChange}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </motion.div>
          ))}
        </div>
      ) : tasks.length > 0 ? (
        <div className="text-center py-12">
          <ApperIcon name="Search" className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No tasks match your search</p>
        </div>
      ) : (
        <Empty
          type="tasks"
          onAction={handleAddTask}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          task={editingTask}
          projects={projects}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default Tasks;