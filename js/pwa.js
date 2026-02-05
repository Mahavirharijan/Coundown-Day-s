let deferredPrompt;
let isInstalled = localStorage.getItem('pwaInstalled') === 'true';
let installBtnListenerAdded = false;

window.addEventListener("beforeinstallprompt", (e) => {
  if (isInstalled) return; // Don't show prompt if already installed

  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById("installBtn");
  btn.style.display = "inline-block";

  if (!installBtnListenerAdded) {
    btn.addEventListener("click", async () => {
      if (!deferredPrompt) return; // Prevent multiple prompts

      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log("User choice:", choice.outcome);
        if (choice.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        deferredPrompt = null;
        btn.style.display = "none";
      } catch (error) {
        console.error("Error during installation:", error);
      }
    });
    installBtnListenerAdded = true;
  }
});

window.addEventListener("appinstalled", (e) => {
  console.log("App was installed successfully");
  deferredPrompt = null;
  isInstalled = true;
  localStorage.setItem('pwaInstalled', 'true');
  const btn = document.getElementById("installBtn");
  btn.style.display = "none";
});
