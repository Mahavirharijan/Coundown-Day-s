// Function to check access code
function checkCode() {
    const userCode = document.getElementById("accessCode").value;

    // Fetch correct code from config.json
    fetch("data/config.json")
        .then(response => response.json())
        .then(config => {
            const correctCode = config.accessCode;

            if (userCode === correctCode) {
                // Correct → Dashboard
                window.location.href = "dashboard.html";
            } else {
                // Wrong → Show error
                document.getElementById("errorMsg").innerText = "Wrong Access Code 💔";
            }
        })
        .catch(err => {
            console.error("Error loading config.json", err);
            document.getElementById("errorMsg").innerText = "Something went wrong! 🔥";
        });
}

// ENTER key support (PC / Laptop users)
document.getElementById("accessCode").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkCode();
    }
});
