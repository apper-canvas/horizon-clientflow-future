import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import FormField from "@/components/molecules/FormField";

const ProjectForm = ({ project, clients, onSubmit, onCancel, isLoading = false }) => {
const [formData, setFormData] = useState({
    title: "",
    clientId: "",
    status: "Planning",
    deadline: "",
    description: "",
    budget: ""
  });

  const [errors, setErrors] = useState({});

useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        clientId: project.clientId?.toString() || "",
        status: project.status || "Planning",
        deadline: project.deadline ? format(new Date(project.deadline), "yyyy-MM-dd") : "",
        description: project.description || "",
        budget: project.budget?.toString() || ""
      });
    }
  }, [project]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.clientId) {
      newErrors.clientId = "Client is required";
    }

if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    }

    if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Valid budget amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
const submitData = {
        ...formData,
        clientId: parseInt(formData.clientId),
        deadline: new Date(formData.deadline).toISOString(),
        budget: parseFloat(formData.budget)
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

const statusOptions = ["Planning", "In Progress", "Review", "Completed"];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <FormField label="Project Title" required error={errors.title}>
        <Input
          value={formData.title}
          onChange={handleChange("title")}
          placeholder="Enter project title"
          error={errors.title}
        />
      </FormField>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FormField label="Client" required error={errors.clientId}>
          <Select
            value={formData.clientId}
            onChange={handleChange("clientId")}
            error={errors.clientId}
          >
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client.Id} value={client.Id}>{client.name}</option>
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

        <FormField label="Deadline" required error={errors.deadline}>
          <Input
            type="date"
            value={formData.deadline}
            onChange={handleChange("deadline")}
            error={errors.deadline}
          />
        </FormField>

        <FormField label="Budget" required error={errors.budget}>
          <Input
            type="number"
            value={formData.budget}
            onChange={handleChange("budget")}
            placeholder="Enter budget amount"
            min="0"
            step="0.01"
            error={errors.budget}
          />
        </FormField>
      </div>

      <FormField label="Description">
        <Textarea
          value={formData.description}
          onChange={handleChange("description")}
          placeholder="Enter project description"
          rows={4}
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
          {isLoading ? "Saving..." : project ? "Update Project" : "Add Project"}
        </Button>
      </div>
    </motion.form>
  );
};

export default ProjectForm;