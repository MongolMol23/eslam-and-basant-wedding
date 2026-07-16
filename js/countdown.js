const weddingDate = new Date("July 24, 2026 20:00:00").getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  if (distance <= 0) {
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";

    return;
  }

  days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));

  hours.textContent = String(
    Math.floor((distance / (1000 * 60 * 60)) % 24),
  ).padStart(2, "0");

  minutes.textContent = String(
    Math.floor((distance / (1000 * 60)) % 60),
  ).padStart(2, "0");

  seconds.textContent = String(Math.floor((distance / 1000) % 60)).padStart(
    2,
    "0",
  );
}

updateCountdown();

setInterval(updateCountdown, 1000);
