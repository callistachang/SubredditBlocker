const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

textarea.placeholder = [
  "AskReddit",
  "Showerthoughts",
  "Cats",
  "changemyview",
].join("\n");

save.addEventListener("click", () => {
  const blocked = textarea.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  alert("Configuration saved!");

  chrome.storage.local.set({ blocked });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;

  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (!Array.isArray(blocked)) {
      return;
    }

    var value = blocked.join("\r\n"); // display every blocked in new line
    textarea.value = value;

    checkbox.checked = enabled;

    document.body.classList.add("ready");
  });
});
