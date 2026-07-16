const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxhMBZd8RoNaPneBNVQR14NkWz-tmM4HkNHGwMFNnUSSWulsr8tTHqimIGykuQjBcud/exec";

const form = document.getElementById("rsvpForm");
const status = document.getElementById("status");
const submitButton = form.querySelector(".submit-btn");

const nameInput = document.getElementById("name");
const nameField = nameInput.closest(".field-group");

const attendanceInput = document.getElementById("attendance");
const attendanceField = document
  .getElementById("attendanceToggle")
  .closest(".field-group");
const attendButtons = document.querySelectorAll(".attend-btn");

function clearError(field) {
  field.classList.remove("has-error");
}

function setError(field) {
  field.classList.add("has-error");
}

// Attendance toggle buttons (replaces the old <select>)
attendButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    attendButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    attendanceInput.value = btn.dataset.value;
    clearError(attendanceField);
  });
});

nameInput.addEventListener("input", () => {
  if (nameInput.value.trim()) clearError(nameField);
});

function validateForm() {
  let isValid = true;

  if (!nameInput.value.trim()) {
    setError(nameField);
    isValid = false;
  } else {
    clearError(nameField);
  }

  if (!attendanceInput.value) {
    setError(attendanceField);
    isValid = false;
  } else {
    clearError(attendanceField);
  }

  return isValid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "";
  status.style.color = "";

  if (!validateForm()) {
    return;
  }

  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(form),
    });

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const result = (await response.text()).trim();

    if (result === "success") {
      status.style.color = "#2E7D32";

      if (attendanceInput.value === "Attending") {
        status.innerHTML =
          '<i class="bi bi-check-circle-fill"></i> Thank you! We can\'t wait to celebrate with you.';
      } else {
        status.innerHTML =
          '<i class="bi bi-heart-fill"></i> Thank you for letting us know. You\'ll be missed!';
      }

      form.reset();
      attendButtons.forEach((b) => b.classList.remove("active"));
      attendanceInput.value = "";
    } else {
      throw new Error("Unexpected response: " + result);
    }
  } catch (error) {
    console.error(error);

    status.style.color = "#D32F2F";
    status.innerHTML =
      '<i class="bi bi-x-circle-fill"></i> Failed to send RSVP. Please try again later.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Confirm RSVP <i class="bi bi-arrow-right"></i>';
  }
});
