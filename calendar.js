const monthYearDisplay = document.getElementById("month-year");
const calendarGrid = document.getElementById("calendar-grid");
const prevMonthButton = document.querySelector(".prev-month");
const nextMonthButton = document.querySelector(".next-month");
const calendarBackground = document.querySelector(".calendar-background");

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearDisplay.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const oldDates = calendarGrid.querySelectorAll(".calendar-date");
    oldDates.forEach(date => date.remove());

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement("div");
        calendarGrid.appendChild(emptyDiv);
    }

    for (let date = 1; date <= lastDateOfMonth; date++) {
        const dateElement = document.createElement("div");
        dateElement.classList.add("calendar-date");
        dateElement.textContent = date;
        dateElement.addEventListener('click', () => handleDateClick(date));
        calendarGrid.appendChild(dateElement);
    }
}

prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

function handleDateClick(date) {
    // Store and display the selected date
    const selectedDate = `${monthYearDisplay.textContent} ${date}`;
    document.getElementById("selected-date").textContent = selectedDate;

    // Show the modal
    document.getElementById("reminder-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("reminder-modal").style.display = "none";
}

function saveReminder() {
    const selectedDate = document.getElementById("selected-date").textContent;
    const title = document.getElementById("reminder-title").value;
    const details = document.getElementById("reminder-details").value;

    if (title && details) {
        alert(`Reminder saved for ${selectedDate}\nTitle: ${title}\nDetails: ${details}`);
        
        // Optionally, save the reminder somewhere here (e.g., localStorage, server)

        // Clear inputs and close the modal
        document.getElementById("reminder-title").value = "";
        document.getElementById("reminder-details").value = "";
        closeModal();
    } else {
        alert("Please fill out both the title and details.");
    }
}

renderCalendar();
