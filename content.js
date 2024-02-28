"use strict";

async function getTabsToOpen() {
  const tabsToOpen = await chrome.runtime.sendMessage({
    eventName: "get-tabs-to-open",
  });
  console.log(tabsToOpen);
}

getTabsToOpen();
