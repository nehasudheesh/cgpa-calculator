// Store all subjects
let subjects = [];

// Add Subject
function addSubject() {

    let subject =
        document.getElementById("subject").value.trim();

    let grade =
        document.getElementById("grade").value;

    let credit =
        parseInt(
            document.getElementById("credit").value
        );

    // Validation
    if (subject === "") {
        alert("Please enter subject name");
        return;
    }

    if (isNaN(credit) || credit <= 0) {
        alert("Please enter valid credits");
        return;
    }

    // Add subject to array
    subjects.push({
        subject: subject,
        grade: grade,
        credit: credit
    });

    // Refresh list
    displaySubjects();
    saveSubjects();
    // Clear inputs
    document.getElementById("subject").value = "";
    document.getElementById("credit").value = "";

    let exists =
subjects.some(
    item =>
    item.subject.toLowerCase()
    ===
    subject.toLowerCase()
);

if(exists){

    alert("Subject already added");

    return;
}
}

// Display all subjects
function displaySubjects() {

    let list =
        document.getElementById("subjectList");

    list.innerHTML = "";

    if (subjects.length === 0) {

        list.innerHTML =
            "<p>No subjects added yet.</p>";

        return;
    }

    subjects.forEach((item, index) => {

        list.innerHTML += `
        <div class="subject-card">

            <span>
                ${item.subject}
                |
                Grade: ${item.grade}
                |
                Credits: ${item.credit}
            </span>

            <button
                onclick="deleteSubject(${index})"
                class="delete-btn">
                Delete
            </button>

        </div>
        `;
    });
}

function deleteSubject(index) {

    subjects.splice(index, 1);

    displaySubjects();

    saveSubjects();
}
// Calculate CGPA
function calculateCGPA() {

    if (subjects.length === 0) {

        document.getElementById("result").innerHTML =
            "Add at least one subject";

        return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((item) => {

        let gradePoint = 0;

        if (item.grade === "S") {
            gradePoint = 10;
        }
        else if (item.grade === "A+") {
            gradePoint = 9;
        }
        else if (item.grade === "A") {
            gradePoint = 8.5;
        }
        else if (item.grade === "B+") {
            gradePoint = 8;
        }
        else if (item.grade === "B") {
            gradePoint = 7;
        }
        else if (item.grade === "C") {
            gradePoint = 6;
        }
        else if (item.grade === "P") {
            gradePoint = 5;
        }
        else {
            gradePoint = 0;
        }

        totalPoints +=
            gradePoint * item.credit;

        totalCredits +=
            item.credit;
    });

    let cgpa =
        totalPoints / totalCredits;

    document.getElementById("result").innerHTML =
        "CGPA = " + cgpa.toFixed(2);
}
function saveSubjects() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
}

function loadSubjects() {

    let storedSubjects =
        localStorage.getItem("subjects");

    if (storedSubjects) {

        subjects =
            JSON.parse(storedSubjects);

        displaySubjects();
    }
}

loadSubjects();