import applicationsService from "./src/services/applications";
import unreachableVacanciesService from "./src/services/unreachableVacancies";
import {
  applicationStatuses,
  unreachableVacancyReasons,
} from "./src/utils/const";

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
        reason: unreachableVacancyReasons.requirements,
      });
    } catch (err) {}
    return;
  }

  const openSubmitFormBtn = document.querySelector(
    "button.js-inbox-toggle-reply-form"
  );
  openSubmitFormBtn.click();

  const requiredInput = document.querySelector(
    "form.js-inbox-reply-form input[required]"
  );
  if (requiredInput) {
    try {
      await unreachableVacanciesService.create({
        jobBoard: "djinni",
        jobTitle,
        companyName,
        url: window.location.href,
        reason: unreachableVacancyReasons.requiredInput,
      });
    } catch (err) {}
    return;
  }

  const submitBtn = document.querySelector("button#job_apply");
  try {
    console.log("before create application");
    await applicationsService.create({
      jobBoard: "djinni",
      jobTitle,
      companyName,
      url: window.location.href,
      status: applicationStatuses.submitted,
    });
  } catch (err) {
    console.log(err);
  }
  submitBtn.click();
};
