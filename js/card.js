function openCard(day) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  const cardDiv = document.createElement("div");
  cardDiv.className = "romantic-card";

  cardDiv.innerHTML = `
       <h1>${day.title2}</h1>
        <img src="${day.image}" class="card-image" alt="${day.title}"></br>
        <Strong>${day.title1}</Strong>
        <p class="paragraph">${day.message}</p>

        <h1>${day.title3}</h1>
        <video width="320" height="240" controls class="card-video">
          <source src="${day.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video></br>

        <button id="closeBtn">Close ❤️</button>
        <button id="playPauseBtn">Pause Music ⏸️</button>
    
    `;

  container.appendChild(cardDiv);

  const audio = new Audio(day.music);
  let isPlaying = true;
  audio.play();

  document.getElementById("playPauseBtn").onclick = () => {
    if (isPlaying) {
      audio.pause();
      document.getElementById("playPauseBtn").textContent = "Play Music ▶️";
    } else {
      audio.play();
      document.getElementById("playPauseBtn").textContent = "Pause Music ⏸️";
    }
    isPlaying = !isPlaying;
  };

  document.getElementById("closeBtn").onclick = () => {
    audio.pause();
    location.reload();
  };
}
