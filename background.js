async function getJobBoardsToOpen() {
  const jobBoardsToOpen = [
    "https://djinni.co/jobs/?primary_keyword=JavaScript&exp_level=no_exp&exp_level=1y&exp_level=2y",
  ];

  const tabs = await chrome.tabs.query({});

  jobBoardsToOpen.filter((jobBoardToOpen) => {
    const tab = tabs.find((tab) => tab.url === jobBoardToOpen);
    return tab;
  });

  return jobBoardsToOpen;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  switch (request.eventName) {
    case "get-job-boards-to-open":
      (async () => {
        const jobBoardsToOpen = await getJobBoardsToOpen();
        sendResponse(jobBoardsToOpen);
      })();
  }

  return true;
});
