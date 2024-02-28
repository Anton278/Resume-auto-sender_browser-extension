"use strict";

async function getTabsToOpen() {
  const tabsToOpen = [
    "https://djinni.co/jobs/?primary_keyword=JavaScript&exp_level=no_exp&exp_level=1y&exp_level=2y",
  ];

  const tabs = await chrome.tabs.query({});
  tabsToOpen.filter((tabToOpen) => {
    const tab = tabs.find((tab) => tab.url === tabToOpen);
    return tab;
  });

  console.log("tabs to open: ", tabsToOpen);

  return tabsToOpen;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  switch (request.eventName) {
    case "get-tabs-to-open":
      (async () => {
        const tabsToOpen = await getTabsToOpen();
        sendResponse(tabsToOpen);
      })();
  }

  return true;
});
