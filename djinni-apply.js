import unreachableVacanciesService from "./src/services/unreachableVacancies";

window.onload = async () => {
  console.log("djinni-apply.js");

  const jobTitle = document.querySelector("h1").innerText;
  const companyName = document.querySelector("a.job-details--title").innerText;

  const disallowedSubmit = document.querySelector(".alert.alert-warning");
  if (disallowedSubmit) {
    try {
      await unreachableVacanciesService.create({
        jobBoard: "djinni",
        jobTitle,
        companyName,
        url: window.location.href,
        reason: "Block from djinni: does not match the requirements",
      });
    } catch (err) {}
    return;
  }

  const submitBtn = document.querySelector("button#job_apply");
  // submitBtn.click();
};
