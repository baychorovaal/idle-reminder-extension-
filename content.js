console.log("Idle Reminder content script loaded");

let timer = null;

function resetTimer() {
  if (timer) clearTimeout(timer);

  try {
    chrome.storage.sync.get(["enabled", "time"], data => {
      if (chrome.runtime.lastError) return;

      const enabled = data.enabled ?? true;
      const delay = data.time ?? 60000;

      if (!enabled) return;

      timer = setTimeout(showImage, delay);
    });
  } catch (e) {
    // контекст уже уничтожен — просто игнорируем
  }
}

function showImage() {
  if (document.getElementById("idle-image")) return;

  const img = document.createElement("img");
  img.id = "idle-image";
  img.src = chrome.runtime.getURL("image.png");

  img.style.position = "fixed";
  img.style.bottom = "20px";
  img.style.right = "20px";
  img.style.maxWidth = "300px";
  img.style.maxHeight = "300px";
  img.style.width = "auto";
  img.style.height = "auto";
  img.style.zIndex = "9999";
  img.style.background = "#fff";
  img.style.padding = "10px";
  img.style.borderRadius = "8px";
  img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";

  img.onload = () => {
    console.log("Idle image loaded");
  };

  img.onerror = () => {
    console.error("Failed to load idle image");
  };

  document.body.appendChild(img);
}
// пользовательские действия
["mousemove", "keydown", "click", "scroll"].forEach(event => {
  document.addEventListener(event, resetTimer);
});

// старт
resetTimer();