export function initKeyboardNav() {
  function isTyping(): boolean {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    return (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      (el as HTMLElement).isContentEditable
    );
  }

  function showHint(text: string) {
    const existing = document.getElementById("kb-hint");
    if (existing) existing.remove();

    const hint = document.createElement("div");
    hint.id = "kb-hint";
    hint.style.cssText = `
      position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:var(--ds-background-100);border:0.5px solid var(--ds-gray-400);
      border-radius:8px;padding:8px 16px;font-family:var(--font-geist-mono);
      font-size:12px;color:var(--ds-gray-700);z-index:9999;
      animation:fadeInUp .2s ease;pointer-events:none;
      box-shadow:0 4px 24px rgba(0,0,0,0.4);
    `;
    hint.textContent = text;
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 2000);
  }

  document.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    switch (e.key) {
      case "/": {
        e.preventDefault();
        const search = document.getElementById("search") as HTMLInputElement;
        if (search) {
          search.focus();
          search.select();
          showHint("Search focused");
        }
        break;
      }

      case "r":
      case "R": {
        if (window.location.pathname !== "/explore") {
          window.location.href = "/explore";
        }
        break;
      }

      case "b":
      case "B": {
        const bmBtn = document.getElementById(
          "bookmark-btn",
        ) as HTMLButtonElement;
        if (bmBtn) {
          bmBtn.click();
          showHint(
            bmBtn.dataset.bookmarked === "true"
              ? "Removed from saved"
              : "Saved to collection",
          );
        }
        break;
      }

      case "s":
      case "S": {
        const shareBtn = document.getElementById(
          "share-btn",
        ) as HTMLButtonElement;
        if (shareBtn) {
          shareBtn.click();
          showHint("Downloading share card...");
        }
        break;
      }

      case "Escape": {
        if (window.location.pathname.startsWith("/planet/")) {
          window.location.href = "/atlas";
        }
        break;
      }

      case "g":
      case "G": {
        showHint("Go to: [A]tlas [H]ome [T]imeline [S]cience [E]xplore");
        const handler = (e2: KeyboardEvent) => {
          document.removeEventListener("keydown", handler);
          const destinations: Record<string, string> = {
            a: "/atlas",
            A: "/atlas",
            h: "/",
            H: "/",
            t: "/timeline",
            T: "/timeline",
            s: "/science",
            S: "/science",
            e: "/explore",
            E: "/explore",
          };
          if (destinations[e2.key]) {
            window.location.href = destinations[e2.key];
          }
        };
        document.addEventListener("keydown", handler);
        setTimeout(
          () => document.removeEventListener("keydown", handler),
          3000,
        );
        break;
      }

      case "?": {
        showShortcutsModal();
        break;
      }
    }
  });

  if (window.location.pathname === "/atlas") {
    initAtlasArrowNav();
  }
}

function initAtlasArrowNav() {
  let focusedIndex = -1;

  function getCards(): HTMLAnchorElement[] {
    return Array.from(document.querySelectorAll("#grid-outer a"));
  }

  function focusCard(index: number) {
    const cards = getCards();
    if (!cards.length) return;
    focusedIndex = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[focusedIndex];
    card.focus();
    card.style.borderColor = "var(--ds-blue-500)";
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function clearFocus() {
    getCards().forEach((c) => {
      c.style.borderColor = "";
    });
  }

  document.addEventListener("keydown", (e) => {
    const cards = getCards();
    if (!cards.length) return;

    const cols =
      window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 3 : 2;
    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        focusCard(focusedIndex < 0 ? 0 : focusedIndex + 1);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        if (focusedIndex > 0) focusCard(focusedIndex - 1);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        focusCard(focusedIndex < 0 ? 0 : focusedIndex + cols);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (focusedIndex >= cols) focusCard(focusedIndex - cols);
        break;
      }
      case "Enter": {
        if (focusedIndex >= 0) {
          cards[focusedIndex]?.click();
        }
        break;
      }
      case "Escape": {
        clearFocus();
        focusedIndex = -1;
        break;
      }
    }
  });
}

function showShortcutsModal() {
  const existing = document.getElementById("shortcuts-modal");
  if (existing) {
    existing.remove();
    return;
  }

  const modal = document.createElement("div");
  modal.id = "shortcuts-modal";
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;
    display:flex;align-items:center;justify-content:center;
    animation:fadeIn .15s ease;
  `;
  const isMac = navigator.platform.toUpperCase().includes("MAC");
  const shortcuts = [
    { key: "/", desc: "Focus search" },
    { key: "R", desc: "Random planet" },
    { key: "B", desc: "Bookmark planet" },
    { key: "S", desc: "Share card" },
    { key: "G A", desc: "Go to Atlas" },
    { key: "G H", desc: "Go to Home" },
    { key: "G T", desc: "Go to Timeline" },
    { key: "G S", desc: "Go to Science" },
    { key: "G E", desc: "Go to Explore" },
    { key: "↑ ↓ ← →", desc: "Navigate planet grid" },
    { key: isMac ? "Return" : "Enter", desc: "Open focused planet" },
    { key: "Esc", desc: "Back to atlas" },
    { key: "?", desc: "Toggle this panel" },
  ];

  modal.innerHTML = `
    <div style="background:var(--ds-background-100);border:0.5px solid var(--ds-gray-300);border-radius:16px;padding:32px;min-width:380px;max-width:90vw">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
        <div style="font-family:var(--font-geist-mono);font-size:12px;color:var(--ds-gray-600);text-transform:uppercase;letter-spacing:.08em">Keyboard shortcuts</div>
        <button id="close-shortcuts" style="font-size:14px;color:var(--ds-gray-600);background:none;border:none;cursor:pointer">✕</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${shortcuts
          .map(
            (shortcut) => `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:32px">
            <span style="font-size:12px;color:var(--ds-gray-700)">${shortcut.desc}</span>
            <kbd style="font-family:var(--font-geist-mono);font-size:11px;color:var(--ds-gray-600);background:var(--ds-background-200);border:0.5px solid var(--ds-gray-300);border-radius:5px;padding:3px 8px;white-space:nowrap">${shortcut.key}</kbd>
          </div>
        `,
          )
          .join("")}
      </div>
      <div style="margin-top:20px;padding-top:16px;border-top:0.5px solid var(--ds-gray-200);font-family:var(--font-geist-mono);font-size:10px;color:var(--ds-gray-500);text-align:center">
        Press ? to toggle
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document
    .getElementById("close-shortcuts")
    ?.addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}
