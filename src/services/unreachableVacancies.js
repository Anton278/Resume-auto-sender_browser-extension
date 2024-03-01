import { api } from "../http/api";

class UnreachableVacanciesService {
  async getAll() {}

  async create(vacancy) {
    const createdVacancy = await api.post("/unreachableVacancies", vacancy);
    return createdVacancy;
  }
}

export default new UnreachableVacanciesService();
