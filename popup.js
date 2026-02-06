const enabledCheckbox = document.getElementById("enabled");
const timeSelect = document.getElementById("time");

chrome.storage.sync.get(["enabled", "time"], data => {
  enabledCheckbox.checked = data.enabled ?? true;
  timeSelect.value = data.time ?? 60000;
});

enabledCheckbox.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: enabledCheckbox.checked });
});

timeSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ time: Number(timeSelect.value) });
});