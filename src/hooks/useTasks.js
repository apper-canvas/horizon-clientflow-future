import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      throw new Error(err.message || "Failed to add task");
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(t => t.Id === parseInt(id) ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || "Failed to update task");
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const updatedTask = await taskService.update(id, { status });
      setTasks(prev => prev.map(t => t.Id === parseInt(id) ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || "Failed to update task status");
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t.Id !== parseInt(id)));
    } catch (err) {
      throw new Error(err.message || "Failed to delete task");
    }
  };

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  };
};