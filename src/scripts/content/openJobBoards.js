async function openJobBoards() {
  const jobBoardsToOpen = await chrome.runtime.sendMessage({
    eventName: "get-job-boards-to-open",
  });
  jobBoardsToOpen.forEach((jobBoardToOpen) =>
    window.open(jobBoardToOpen, "_blank")
  );
}

// const pagination = document.querySelector(
//   "ul.pagination.pagination_with_numbers"
// );
// // children.length minus previous and next page buttons
// const pagesCount = pagination.children.length - 2;

openJobBoards();
