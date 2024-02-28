"use strict";

console.log("djinni.js");

const jobsList = document.querySelector(".list-jobs");

const newJobsList = Array.from(jobsList.children).filter((job) => {
  const applicationSend = job.querySelector("a.text-success span.bi.bi-check");
  return !applicationSend;
});

newJobsList.forEach((job) => {
  const anchor = job.querySelector("a.h3.job-list-item__link");

  // window.open(anchor.href, "_blank");
});
