async function openJobBoards() {
  const jobBoardsToOpen = await chrome.runtime.sendMessage({
    eventName: "get-job-boards-to-open",
  });
  jobBoardsToOpen.forEach((jobBoardToOpen) =>
    window.open(jobBoardToOpen, "_blank")
  );
}

openJobBoards();
