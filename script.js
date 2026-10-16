
const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const count = document.getElementById("count");
const emptyMessage = document.getElementById("emptyMessage");

const students = [];

function renderStudents() {
  studentList.replaceChildren();

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    [student.name, student.roll, student.course].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => {
      students.splice(index, 1);
      renderStudents();
    });

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    studentList.appendChild(row);
  });

  count.textContent = `Total students: ${students.length}`;
  emptyMessage.hidden = students.length > 0;
}

studentForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const course = document.getElementById("course").value.trim();

  if (!name || !roll || !course) return;

  if (students.some(student => student.roll.toLowerCase() === roll.toLowerCase())) {
    alert("That roll number already exists.");
    return;
  }

  students.push({ name, roll, course });
  studentForm.reset();
  renderStudents();
});

renderStudents();
