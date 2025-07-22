import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useClients } from "@/hooks/useClients";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ClientCard from "@/components/organisms/ClientCard";
import ClientForm from "@/components/organisms/ClientForm";
import Modal from "@/components/organisms/Modal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Clients = () => {
  const { clients, loading, error, loadClients, addClient, updateClient, deleteClient } = useClients();
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    setEditingClient(null);
    setShowModal(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleSubmit = async (clientData) => {
    try {
      setIsSubmitting(true);
      
      if (editingClient) {
        await updateClient(editingClient.Id, clientData);
        toast.success("Client updated successfully");
      } else {
        await addClient(clientData);
        toast.success("Client added successfully");
      }
      
      setShowModal(false);
      setEditingClient(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(clientId);
        toast.success("Client deleted successfully");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadClients} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client relationships</p>
        </div>
        
        <Button onClick={handleAddClient} className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Client</span>
        </Button>
      </div>

      {/* Search */}
      {clients.length > 0 && (
        <div className="flex justify-between items-center">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search clients..."
            className="w-full max-w-md"
          />
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}

      {/* Clients Grid */}
      {filteredClients.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ClientCard
                client={client}
                onEdit={handleEditClient}
                onDelete={handleDeleteClient}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : clients.length > 0 ? (
        <div className="text-center py-12">
          <ApperIcon name="Search" className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No clients match your search</p>
        </div>
      ) : (
        <Empty
          type="clients"
          onAction={handleAddClient}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingClient ? "Edit Client" : "Add New Client"}
      >
        <ClientForm
          client={editingClient}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default Clients;