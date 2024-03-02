import axios from "axios";

import unreachableVacanciesService from "../../../services/unreachableVacancies";

function parseVacancies(document) {
  const vacancies = [];

  const jobsListNode = document.querySelector("ul.list-jobs");
  Array.from(jobsListNode.children).forEach((jobItemNode) => {
    const url = jobItemNode.querySelector("a.h3.job-list-item__link").href;
    const isApplicationSent = Boolean(
      jobItemNode.querySelector("a.text-success span.bi.bi-check")
    );
    vacancies.push({ url, isApplicationSent });
  });

  return vacancies;
}

window.onload = async () => {
  console.log("djinni1.js");

  const parser = new DOMParser();

  try {
    let vacancies = [];

    const vacanciesFirstPageUrl =
      "https://djinni.co/jobs/?primary_keyword=JavaScript&exp_level=no_exp&exp_level=1y&exp_level=2y";
    let vacanciesFirstPage = await axios.get(vacanciesFirstPageUrl);
    vacanciesFirstPage = parser.parseFromString(
      vacanciesFirstPage.data,
      "text/html"
    );
    vacancies.push(...parseVacancies(vacanciesFirstPage));
    console.log("vacanciesFirstPage: ", vacanciesFirstPage);
    const paginationNode = vacanciesFirstPage.querySelector(
      "ul.pagination.pagination_with_numbers"
    );
    const pagesCount = paginationNode.children.length - 2;
    const vacanciesPagesUrls = Array.from(Array(pagesCount - 1)).map(
      (_, i) => `${vacanciesFirstPageUrl}&page=${i + 2}`
    );
    const vacanciesPages = (
      await Promise.all(
        vacanciesPagesUrls.map((vacancyPageUrl) => axios.get(vacancyPageUrl))
      )
    ).map((vacancyPage) =>
      parser.parseFromString(vacancyPage.data, "text/html")
    );

    vacanciesPages.forEach((vacancyPage) =>
      vacancies.push(...parseVacancies(vacancyPage))
    );

    vacancies = vacancies.filter((vacancy) => !vacancy.isApplicationSent);

    let unreachableVacancies = await unreachableVacanciesService.getAll();
    unreachableVacancies = unreachableVacancies.filter(
      (unreachableVacancy) => unreachableVacancy.jobBoard === "djinni"
    );

    // clear from unreachable
    vacancies = vacancies.filter(
      (vacancy) =>
        !unreachableVacancies.find(
          (unreachableVacancy) => unreachableVacancy.url === vacancy.url
        )
    );
    console.log("vacancies: ", vacancies);

    vacancies.forEach((vacancy) => window.open(vacancy.url, "_blank"));
  } catch (err) {
    console.log(err);
  }

  setInterval(async () => {
    console.log("interval");
    try {
      const parser = new DOMParser();
      const vacanciesFirstPageUrl =
        "https://djinni.co/jobs/?primary_keyword=JavaScript&exp_level=no_exp&exp_level=1y&exp_level=2y";
      let vacanciesFirstPage = await axios.get(vacanciesFirstPageUrl);
      vacanciesFirstPage = parser.parseFromString(
        vacanciesFirstPage.data,
        "text/html"
      );
      let vacancies = parseVacancies(vacanciesFirstPage);
      vacancies = vacancies.filter((vacancy) => !vacancy.isApplicationSent);

      let unreachableVacancies = await unreachableVacanciesService.getAll();
      unreachableVacancies = unreachableVacancies.filter(
        (unreachableVacancy) => unreachableVacancy.jobBoard === "djinni"
      );

      // clear from unreachable
      vacancies = vacancies.filter(
        (vacancy) =>
          !unreachableVacancies.find(
            (unreachableVacancy) => unreachableVacancy.url === vacancy.url
          )
      );
      vacancies.forEach((vacancy) => window.open(vacancy.url, "_blank"));
    } catch (err) {
      console.log(err);
    }
  }, 1000 * 60);
};
