fetch("data/config.json")
.then(res => res.json())
.then(config => {
    const today = new Date();
    const container = document.getElementById("cardsContainer");

    config.days.forEach(day => {
        const cardDate = new Date(day.date + "T" + config.unlockTime);
        const cardDiv = document.createElement("div");
        cardDiv.className = "day-card";

        let isUnlocked = (today >= cardDate) && day.manualUnlock;

        if(isUnlocked){
            cardDiv.innerHTML = `<h3>${day.title} </h3><h6> ${day.date}</h6><p>Unlocked 💖</p>`;
            cardDiv.onclick = () => openCard(day);
        } else {
            cardDiv.innerHTML = `<h3>${day.title} </h3><h6> ${day.date}</h6><p>Locked 🔒</p>`;
        }

        container.appendChild(cardDiv);
    });
});
