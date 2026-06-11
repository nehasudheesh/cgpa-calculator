let currentSGPA = 0;
let cgpaChart;
// Store all subjects
let subjects = [];
let semesters = [];
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

    let cgpa = totalPoints / totalCredits;

    currentSGPA = cgpa;

    document.getElementById("result").innerHTML = "CGPA = " + cgpa.toFixed(2);
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

loadSemesterData();

loadTheme();
function saveSemester() {

    let semesterName =
        document.getElementById(
            "semesterName"
        ).value;

    if (semesterName === "") {

        alert(
            "Enter semester name"
        );

        return;
    }

    if (currentSGPA === 0) {

        alert(
            "Calculate SGPA first"
        );

        return;
    }

    semesters.push({

        semester:
            semesterName,

        sgpa:
            currentSGPA.toFixed(2)

    });

    displaySemesters();

    calculateOverallCGPA();

    updateDashboard();
    updatePercentage();
    drawChart();
    saveSemesterData();

    document.getElementById(
        "semesterName"
    ).value = "";
}
function displaySemesters() {

    let list =
        document.getElementById(
            "semesterList"
        );

    list.innerHTML = "";

    semesters.forEach(

        (item, index) => {

        list.innerHTML += `
        <div class="subject-card">

            <span>

                ${item.semester}
                :
                ${item.sgpa}

            </span>

            <button
            class="delete-btn"
            onclick="deleteSemester(${index})">

            Delete

            </button>

        </div>
        `;
    });
}
function deleteSemester(index) {

    function deleteSemester(index) {

    semesters.splice(index,1);

    displaySemesters();

    calculateOverallCGPA();

    updateDashboard();
    updatePercentage();
    drawChart();
    saveSemesterData();
}
    
}
function saveSemesterData() {

    localStorage.setItem(

        "semesters",

        JSON.stringify(
            semesters
        )
    );
}
function loadSemesterData() {

    let data =

    localStorage.getItem(
        "semesters"
    );

    if(data){

        semesters =

        JSON.parse(data);

        displaySemesters();

        calculateOverallCGPA();

        updateDashboard();
        updatePercentage();
        drawChart();
    }
}
function calculateOverallCGPA() {

    if (semesters.length === 0) {

        document.getElementById(
            "overallCGPA"
        ).innerHTML =
        "No semesters available";

        return;
    }

    let totalSGPA = 0;

    semesters.forEach((item) => {

        totalSGPA +=
            parseFloat(item.sgpa);

    });

    let overallCGPA =
        totalSGPA /
        semesters.length;

    document.getElementById(
        "overallCGPA"
    ).innerHTML =
        "Overall CGPA = "
        + overallCGPA.toFixed(2);
}
function updateDashboard() {

    if (semesters.length === 0) {

        document.getElementById(
            "dashboardCGPA"
        ).innerHTML = "0.00";

        document.getElementById(
            "highestSGPA"
        ).innerHTML = "0.00";

        document.getElementById(
            "lowestSGPA"
        ).innerHTML = "0.00";

        document.getElementById(
            "totalSemesters"
        ).innerHTML = "0";

        return;
    }

    let sgpaValues =
        semesters.map(
            item => parseFloat(item.sgpa)
        );

    let highest =
        Math.max(...sgpaValues);

    let lowest =
        Math.min(...sgpaValues);

    let total = 0;

    sgpaValues.forEach(
        value => total += value
    );

    let overall =
        total / sgpaValues.length;

    document.getElementById(
        "dashboardCGPA"
    ).innerHTML =
        overall.toFixed(2);

    document.getElementById(
        "highestSGPA"
    ).innerHTML =
        highest.toFixed(2);

    document.getElementById(
        "lowestSGPA"
    ).innerHTML =
        lowest.toFixed(2);

    document.getElementById(
        "totalSemesters"
    ).innerHTML =
        semesters.length;
}
function calculatePercentage() {

    if (semesters.length === 0) {

        document.getElementById(
            "percentageResult"
        ).innerHTML =
        "No semester data available";

        return;
    }

    let totalSGPA = 0;

    semesters.forEach((item) => {

        totalSGPA +=
            parseFloat(item.sgpa);

    });

    let cgpa =
        totalSGPA /
        semesters.length;

    let percentage =
        (cgpa - 0.75) * 10;
    updateAcademicStanding(cgpa);

    document.getElementById(
        "percentageResult"
    ).innerHTML =

        "Percentage = "
        + percentage.toFixed(2)
        + "%";
}
function updatePercentage() {

    if (semesters.length === 0) {

       document.getElementById(
            "dashboardPercentage"
       ).innerHTML =
            percentage.toFixed(2) + "%";

        return;
    }

    let totalSGPA = 0;

    semesters.forEach((item) => {

        totalSGPA +=
            parseFloat(item.sgpa);

    });

    let cgpa =
        totalSGPA /
        semesters.length;

    let percentage =
        (cgpa - 0.75) * 10;

    document.getElementById(
        "percentageResult"
    ).innerHTML =

        "Percentage = "
        + percentage.toFixed(2)
        + "%";
}
function updateAcademicStanding(cgpa) {

    let standing = "";

    if (cgpa >= 9) {
        standing = "Outstanding";
    }
    else if (cgpa >= 8) {
        standing = "Excellent";
    }
    else if (cgpa >= 7) {
        standing = "Very Good";
    }
    else if (cgpa >= 6) {
        standing = "Good";
    }
    else if (cgpa >= 5) {
        standing = "Average";
    }
    else {
        standing = "Needs Improvement";
    }

    document.getElementById(
        "academicStanding"
    ).innerHTML =
        "Academic Standing: " + standing;
}
function drawChart() {

    let labels =
        semesters.map(
            item => item.semester
        );

    let values =
        semesters.map(
            item => parseFloat(item.sgpa)
        );

    let ctx =
        document.getElementById(
            "cgpaChart"
        );

    if (cgpaChart) {
        cgpaChart.destroy();
    }

    cgpaChart =
        new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "SGPA",

                data: values,

                borderWidth: 1

            }]
        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 10
                }
            }
        }
    });
}
function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    let button =
        document.getElementById("themeBtn");

    if (document.body.classList.contains("dark-mode")) {

        button.innerHTML = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    } else {

        button.innerHTML = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");
    }
}

function loadTheme() {

    let savedTheme =
        localStorage.getItem("theme");

    let button =
        document.getElementById("themeBtn");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        button.innerHTML = "☀️ Light Mode";
    }
}