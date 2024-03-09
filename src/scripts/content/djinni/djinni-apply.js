import applicationsService from "../../../services/applications";
import unreachableVacanciesService from "../../../services/unreachableVacancies";
import {
  applicationStatuses,
  unreachableVacancyReasons,
} from "../../../utils/const";

window.onload = async () => {
  console.log("djinni-apply.js");

  const jobTitle = document.querySelector("h1").innerText;
  const companyName = document.querySelector("a.job-details--title").innerText;
  const applicationsCount = document
    .querySelector("span.bi.bi-people-fill")
    .nextSibling.textContent.replaceAll(/\D/g, "");

  const disallowedSubmit = document.querySelector(
    "span.bi.bi-x-circle.text-danger"
  );
  if (disallowedSubmit) {
    try {
      await unreachableVacanciesService.create({
        jobBoard: "djinni",
        jobTitle,
        companyName,
        url: window.location.href,
        reason: unreachableVacancyReasons.requirements,
      });
    } catch (err) {
    } finally {
      return window.close();
    }
  }

  const openSubmitFormBtn = document.querySelector(
    "button.js-inbox-toggle-reply-form"
  );
  openSubmitFormBtn.click();

  const requiredInput = document.querySelector(
    "form.js-inbox-reply-form input[required]"
  );
  const requiredTextarea = document.querySelector(
    "form.js-inbox-reply-form textarea[required]"
  );
  if (requiredInput || requiredTextarea) {
    try {
      await unreachableVacanciesService.create({
        jobBoard: "djinni",
        jobTitle,
        companyName,
        url: window.location.href,
        reason: unreachableVacancyReasons.requiredInput,
        applicationsCount,
      });
    } catch (err) {
    } finally {
      return window.close();
    }
  }

  const submitBtn = document.querySelector("button#job_apply");
  if (submitBtn) {
    try {
      await applicationsService.create({
        jobBoard: "djinni",
        jobTitle,
        companyName,
        url: window.location.href,
        status: applicationStatuses.submitted,
        applicationsCount,
      });
      submitBtn.click();
    } catch (err) {
      console.log(err);
    }
  } else {
    window.close();
  }
};
