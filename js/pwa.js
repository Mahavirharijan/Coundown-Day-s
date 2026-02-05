let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById("installBtn");
  btn.style.display = "inline-block";

  btn.addEventListener("click", async () => {
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
});

window.addEventListener("appinstalled", (e) => {
  console.log("App was installed successfully");
  deferredPrompt = null;
});
