function calculateCGPA() {

    let grade = document.getElementById("grade").value;
    let credit = parseInt(
        document.getElementById("credit").value
    );

    let gradePoint = 0;

    if (grade === "A+") {
        gradePoint = 10;
    }
    else if (grade === "A") {
        gradePoint = 9;
    }
    else if (grade === "B+") {
        gradePoint = 8;
    }
    else if (grade === "B") {
        gradePoint = 7;
    }
    else if (grade === "C") {
        gradePoint = 6;
    }
    else if (grade === "P") {
        gradePoint = 5;
    }
    else {
        gradePoint = 0;
    }

    let cgpa = gradePoint;

    document.getElementById("result").innerHTML =
        "CGPA = " + cgpa;
}