"use strict";

async function getCV() {
  try {
    const CVUrl =
      "https://drive.google.com/file/d/1_OdEkGkpEwOApD62WpH6etAsuD_FJ1Rh/view?usp=drive_link";
    const res = await fetch(CVUrl);
    const blob = await res.blob();
    const cv = new File([blob], "Nakonechnyi_A_CV.pdf", {
      type: "application/pdf",
    });
    return cv;
  } catch (err) {}
}

window.onload = () => {
  console.log("djinni-apply.js");

  const submitBtn = document.querySelector(
    "button.btn-primary.js-inbox-toggle-reply-form"
  );
  submitBtn.click();

  const addCvAnchor = document.querySelector("#cv_select + a");
  addCvAnchor.click();

  const CVInputIntervalId = setInterval(async () => {
    const CVInput = document.querySelector("#cv_file_input");

    if (!CVInput) {
      return;
    }

    const cv = await getCV();

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(cv);

    CVInput.files = dataTransfer.files;

    const submitBtn = document.querySelector("button#job_apply");
    submitBtn?.click();

    console.log("interval");

    clearInterval(CVInputIntervalId);
  }, 400);
};
