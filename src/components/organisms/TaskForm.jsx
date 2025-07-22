import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import FormField from "@/components/molecules/FormField";

const TaskForm = ({ task, projects, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    projectId: "",
    status: "To Do",
    dueDate: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        projectId: task.projectId?.toString() || "",
        status: task.status || "To Do",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
        description: task.description || ""
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.projectId) {
      newErrors.projectId = "Project is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        projectId: parseInt(formData.projectId),
        dueDate: new Date(formData.dueDate).toISOString()
      };
      onSubmit(submitData);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const statusOptions = ["To Do", "In Progress", "Done"];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <FormField label="Task Title" required error={errors.title}>
        <Input
          value={formData.title}
          onChange={handleChange("title")}
          placeholder="Enter task title"
          error={errors.title}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Project" required error={errors.projectId}>
          <Select
            value={formData.projectId}
            onChange={handleChange("projectId")}
            error={errors.projectId}
          >
            <option value="">Select a project</option>
            {projects.map(project => (
              <option key={project.Id} value={project.Id}>{project.title}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Status">
          <Select
            value={formData.status}
            onChange={handleChange("status")}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Due Date" required error={errors.dueDate}>
          <Input
            type="date"
            value={formData.dueDate}
            onChange={handleChange("dueDate")}
            error={errors.dueDate}
          />
        </FormField>
      </div>

      <FormField label="Description">
        <Textarea
          value={formData.description}
          onChange={handleChange("description")}
          placeholder="Enter task description"
          rows={3}
        />
      </FormField>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : task ? "Update Task" : "Add Task"}
        </Button>
      </div>
    </motion.form>
  );
};

export default TaskForm;