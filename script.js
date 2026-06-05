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

    // Clear inputs
    document.getElementById("subject").value = "";
    document.getElementById("credit").value = "";
}

// Display all subjects
function displaySubjects() {

    let list =
        document.getElementById("subjectList");

    list.innerHTML = "";

    subjects.forEach((item, index) => {

        list.innerHTML += `
            <p>
                ${index + 1}. 
                ${item.subject}
                |
                Grade: ${item.grade}
                |
                Credits: ${item.credit}
            </p>
        `;
    });
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