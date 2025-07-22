import clientsData from "@/services/mockData/clients.json";

let clients = [...clientsData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const clientService = {
  async getAll() {
    await delay();
    return [...clients];
  },

  async getById(id) {
    await delay();
    const client = clients.find(c => c.Id === parseInt(id));
    if (!client) throw new Error("Client not found");
    return { ...client };
  },

  async create(clientData) {
    await delay();
    const maxId = Math.max(...clients.map(c => c.Id), 0);
    const newClient = {
      ...clientData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    clients.push(newClient);
    return { ...newClient };
  },

  async update(id, clientData) {
    await delay();
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error("Client not found");
    
    clients[index] = { ...clients[index], ...clientData };
    return { ...clients[index] };
  },

  async delete(id) {
    await delay();
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error("Client not found");
    
    const deletedClient = clients.splice(index, 1)[0];
    return { ...deletedClient };
  }
};