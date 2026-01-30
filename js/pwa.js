let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById("installBtn");
  btn.style.display = "inline-block";

  btn.addEventListener("click", async () => {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("User choice:", choice.outcome);
    deferredPrompt = null;
    btn.style.display = "none";
  });
});
