import projectsData from "@/services/mockData/projects.json";

let projects = [...projectsData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const projectService = {
  async getAll() {
    await delay();
    return [...projects];
  },

  async getById(id) {
    await delay();
    const project = projects.find(p => p.Id === parseInt(id));
    if (!project) throw new Error("Project not found");
    return { ...project };
  },

  async getByClientId(clientId) {
    await delay();
    return projects.filter(p => p.clientId === parseInt(clientId)).map(p => ({ ...p }));
  },

  async create(projectData) {
    await delay();
    const maxId = Math.max(...projects.map(p => p.Id), 0);
    const newProject = {
      ...projectData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    return { ...newProject };
  },

  async update(id, projectData) {
    await delay();
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error("Project not found");
    
    projects[index] = { ...projects[index], ...projectData };
    return { ...projects[index] };
  },

  async delete(id) {
    await delay();
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error("Project not found");
    
    const deletedProject = projects.splice(index, 1)[0];
    return { ...deletedProject };
  }
};