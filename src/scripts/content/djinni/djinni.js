"use strict";

import unreachableVacanciesService from "../../../services/unreachableVacancies";

window.onload = async () => {
  console.log("djinni.js");

  const jobsListNode = document.querySelector(".list-jobs");

  let unreachableVacancies = [];

  try {
    unreachableVacancies = await unreachableVacanciesService.getAll();
    unreachableVacancies = unreachableVacancies.filter(
      (vacancy) => vacancy.jobBoard === "djinni"
    );
  } catch (err) {}

  const newJobsList = Array.from(jobsListNode.children).filter((job) => {
    const applicationSendNode = job.querySelector(
      "a.text-success span.bi.bi-check"
    );

    const url = document.querySelector("a.h3.job-list-item__link").href;
    const unreachableVacancy = unreachableVacancies.find(
      (vacancy) => vacancy.url === url
    );

    return !applicationSendNode && !unreachableVacancy;
  });

  newJobsList.forEach((job) => {
    const anchor = job.querySelector("a.h3.job-list-item__link");
    window.open(anchor.href, "_blank");
  });
};
