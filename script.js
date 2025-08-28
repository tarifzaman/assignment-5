// ====== NAVBAR COUNTERS ======
let heartCount = 0;
let copyCount = 2; // default 2 as in your design
let coins = 100;   // default 100

// Select Navbar elements
const heartCounter = document.querySelector("nav .fa-heart").parentElement.querySelector("span");
const starCounter = document.querySelector("nav .fa-star").parentElement.querySelector("span");
const copyCounter = document.querySelector("nav .fa-star").parentElement.nextElementSibling.querySelector("span");

// ====== HEART ICON FUNCTIONALITY ======
document.querySelectorAll(".fa-heart").forEach(heart => {
  heart.addEventListener("click", function () {
    if (this.classList.contains("text-red-500")) {
      this.classList.remove("text-red-500");
      this.classList.add("text-gray-400");
      heartCount--;
    } else {
      this.classList.remove("text-gray-400");
      this.classList.add("text-red-500");
      heartCount++;
    }
    heartCounter.textContent = heartCount;
  });
});

// ====== COPY BUTTON FUNCTIONALITY ======
document.querySelectorAll(".fa-copy").forEach(copyBtn => {
  copyBtn.parentElement.addEventListener("click", function () {
    const hotline = this.closest(".bg-white").querySelector("p.text-3xl").textContent;
    navigator.clipboard.writeText(hotline).then(() => {
      alert(`${hotline} copied to clipboard`);
      copyCount++;
      copyCounter.textContent = `${copyCount} Copy`;
    });
  });
});

// ====== CALL BUTTON FUNCTIONALITY ======
const callHistoryList = document.querySelector("aside ul");
callHistoryList.innerHTML = ""; // make it empty initially
const coinDisplay = starCounter;

document.querySelectorAll(".fa-phone").forEach(callBtn => {
  callBtn.parentElement.addEventListener("click", function () {
    const card = this.closest(".bg-white");
    const serviceName = card.querySelector("h2").textContent;
    const hotline = card.querySelector("p.text-3xl").textContent;

    if (coins < 20) {
      alert("Not enough coins to make a call!");
      return;
    }

    coins -= 20;
    coinDisplay.textContent = coins;

    alert(`Calling ${serviceName} (${hotline})`);

    // Get current local time
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    // Add to call history
    const li = document.createElement("li");
    li.classList.add("bg-gray-100", "p-2", "rounded-md"); // light gray background
    li.innerHTML = `<i class="fas fa-phone mr-2 text-[#00A63E]"></i>${serviceName} (${hotline})<br><span class="text-xs text-gray-400">${timeString}</span>`;
    callHistoryList.prepend(li);
  });
});

// ====== CLEAR HISTORY FUNCTIONALITY ======
document.querySelector("aside button").addEventListener("click", () => {
  callHistoryList.innerHTML = "";
});
