async function getAllTabs() {
  return chrome.tabs.query({ currentWindow: true });
}

function isDiscardable(tab) {
  if (tab.active) return false;
  if (tab.discarded) return false;
  if (!tab.url) return false;
  if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://") || tab.url.startsWith("about:")) return false;
  return true;
}

function getBadge(tab) {
  if (tab.active) return { text: "active", cls: "badge-active" };
  if (tab.discarded) return { text: "already inactive", cls: "badge-discarded" };
  if (tab.audible) return { text: "playing audio", cls: "" };
  if (tab.url?.startsWith("chrome://")) return { text: "internal page", cls: "" };
  return null;
}

async function discardTab(tabId, btn, row) {
  btn.disabled = true;
  btn.textContent = "...";
  try {
    const result = await chrome.tabs.discard(tabId);
    if (result) {
      row.classList.add("discarded");
      btn.textContent = "done";
      const badge = row.querySelector(".tab-badge");
      if (badge) { badge.textContent = "inactive"; badge.className = "tab-badge badge-discarded"; }
    } else {
      btn.textContent = "refused";
      setTimeout(() => { btn.textContent = "discard"; btn.disabled = false; }, 1500);
    }
  } catch {
    btn.textContent = "failed";
    setTimeout(() => { btn.textContent = "discard"; btn.disabled = false; }, 1500);
  }
}

async function render() {
  const tabs = await getAllTabs();
  const list = document.getElementById("tab-list");
  list.innerHTML = "";

  for (const tab of tabs) {
    const row = document.createElement("div");
    row.className = "tab-row" + (tab.discarded ? " discarded" : "");

    // Favicon
    const img = document.createElement("img");
    img.className = "favicon";
    img.src = tab.favIconUrl || "icon16.png";
    img.onerror = () => { img.src = "icon16.png"; };

    // Info
    const info = document.createElement("div");
    info.className = "tab-info";
    const title = document.createElement("div");
    title.className = "tab-title";
    title.textContent = tab.title || tab.url || "Untitled";
    info.appendChild(title);

    const badge = getBadge(tab);
    if (badge) {
      const b = document.createElement("div");
      b.className = "tab-badge " + badge.cls;
      b.textContent = badge.text;
      info.appendChild(b);
    }

    // Button
    const btn = document.createElement("button");
    btn.className = "btn-discard";
    btn.textContent = "discard";
    if (!isDiscardable(tab)) btn.disabled = true;
    btn.addEventListener("click", () => discardTab(tab.id, btn, row));

    row.appendChild(img);
    row.appendChild(info);
    row.appendChild(btn);
    list.appendChild(row);
  }
}

document.getElementById("discard-all").addEventListener("click", async () => {
  const rows = document.querySelectorAll(".tab-row:not(.discarded)");
  const tabs = await getAllTabs();
  for (const tab of tabs) {
    if (isDiscardable(tab)) {
      await chrome.tabs.discard(tab.id).catch(() => {});
    }
  }
  render();
});

render();
