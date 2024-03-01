import applicationsService from "./src/services/applications";
import { applicationStatuses } from "./src/utils/const";

console.log("djinni-apply-succeded.js");

// url without query params
const url = window.location.href.replace(/\?.+/, "");
try {
  await applicationsService.update({
    url,
    status: applicationStatuses.success,
  });
} catch (err) {}
