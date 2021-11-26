chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    if (!Array.isArray(local.blocked)) {
      chrome.storage.local.set({ blocked: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: true });
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const href = new URL(url).href;
  console.log(href);

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (
      Array.isArray(blocked) &&
      enabled &&
      blocked.find((subreddit) => href.includes("reddit.com/r/" + subreddit))
    ) {
      chrome.tabs.remove(tabId);
      chrome.tabs.create({
        url: "blocked.html",
      });
    }
  });
});
