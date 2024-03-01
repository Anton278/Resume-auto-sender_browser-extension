import { api } from "../http/api";

class ApplicationsService {
  async getAll() {
    const applications = await api.get("/applications");
    return applications;
  }

  async getOne(url) {
    const application = await api.get(`/applications?url=${url}`);
    return application.data;
  }

  async create(application) {
    console.log("sending application...");
    const createdApplication = await api.post("/applications", application);
    console.log("sent application");
    return createdApplication;
  }

  async update(application) {
    const updatedApplication = await api.patch("/applications", application);
    return updatedApplication.data;
  }
}

export default new ApplicationsService();
