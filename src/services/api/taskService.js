import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const taskService = {
  async getAll() {
    await delay();
    return [...tasks];
  },

  async getById(id) {
    await delay();
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) throw new Error("Task not found");
    return { ...task };
  },

  async getByProjectId(projectId) {
    await delay();
    return tasks.filter(t => t.projectId === parseInt(projectId)).map(t => ({ ...t }));
  },

  async create(taskData) {
    await delay();
    const maxId = Math.max(...tasks.map(t => t.Id), 0);
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    
    tasks[index] = { ...tasks[index], ...taskData };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    
    const deletedTask = tasks.splice(index, 1)[0];
    return { ...deletedTask };
  }
};