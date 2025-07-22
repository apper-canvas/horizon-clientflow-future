import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
const ClientForm = ({ client, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active"
  });
  const [errors, setErrors] = useState({});

useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        company: client.company || "",
        status: client.status || "Active"
      });
    }
  }, [client]);

const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
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

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" required error={errors.name}>
          <Input
            value={formData.name}
            onChange={handleChange("name")}
            placeholder="Enter client's full name"
            error={errors.name}
          />
        </FormField>

        <FormField label="Company" required error={errors.company}>
          <Input
            value={formData.company}
            onChange={handleChange("company")}
            placeholder="Enter company name"
            error={errors.company}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Email Address" required error={errors.email}>
          <Input
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="Enter email address"
            error={errors.email}
          />
        </FormField>

        <FormField label="Phone Number" required error={errors.phone}>
          <Input
            value={formData.phone}
            onChange={handleChange("phone")}
            placeholder="Enter phone number"
            error={errors.phone}
          />
        </FormField>
</div>

      <FormField label="Client Status" required error={errors.status}>
        <Select
          value={formData.status}
          onChange={handleChange("status")}
          error={errors.status}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Prospective">Prospective</option>
        </Select>
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
          {isLoading ? "Saving..." : client ? "Update Client" : "Add Client"}
        </Button>
      </div>
    </motion.form>
  );
};

export default ClientForm;