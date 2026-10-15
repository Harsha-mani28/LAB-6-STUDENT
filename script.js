
const form = document.getElementById("resultForm");
const resultTable = document.getElementById("resultTable");
const message = document.getElementById("message");
const search = document.getElementById("search");
const emptyMessage = document.getElementById("emptyMessage");

let students = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const roll = document.getElementById("roll").value.trim();
    const name = document.getElementById("name").value.trim();

    const marks = [
        Number(document.getElementById("subject1").value),
        Number(document.getElementById("subject2").value),
        Number(document.getElementById("subject3").value)
    ];

    if (marks.some(mark => mark < 0 || mark > 100)) {
        message.textContent = "Marks must be between 0 and 100.";
        return;
    }

    if (students.some(student => student.roll.toLowerCase() === roll.toLowerCase())) {
        message.textContent = "Roll number already exists.";
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = total / 3;
    const result = marks.every(mark => mark >= 35) ? "Pass" : "Fail";

    students.push({ roll, name, total, percentage, result });

    form.reset();
    message.textContent = "Student result added successfully!";
    displayResults();
});

function displayResults() {
    const query = search.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.roll.toLowerCase().includes(query)
    );

    resultTable.replaceChildren();

    filtered.forEach(student => {
        const row = document.createElement("tr");

        [
            student.roll,
            student.name,
            student.total + " / 300",
            student.percentage.toFixed(2) + "%",
            student.result
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            students = students.filter(item => item.roll !== student.roll);
            message.textContent = "Student result deleted.";
            displayResults();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        resultTable.appendChild(row);
    });

    emptyMessage.hidden = filtered.length > 0;
}

search.addEventListener("input", displayResults);
displayResults();
