import { api } from "../http/api";

class UnreachableVacanciesService {
  async getAll() {
    const vacancies = await api.get("/unreachableVacancies");
    return vacancies.data;
  }

  async create(vacancy) {
    const createdVacancy = await api.post("/unreachableVacancies", vacancy);
    return createdVacancy;
  }
}

export default new UnreachableVacanciesService();
