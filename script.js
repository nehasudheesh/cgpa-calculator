function calculateCGPA() {

    let grade = document.getElementById("grade").value;
    let credit = parseInt(
        document.getElementById("credit").value
    );

    let gradePoint = 0;

if (grade === "S") {
    gradePoint = 10;
}
else if (grade === "A+") {
    gradePoint = 9.0;
}
else if (grade === "A") {
    gradePoint = 8.5;
}
else if (grade === "B+") {
    gradePoint = 8.0;
}
else if (grade === "B") {
    gradePoint = 7.0;
}
else if (grade === "C") {
    gradePoint = 6.0;
}
else if (grade === "P") {
    gradePoint = 5.0;
}
else {
    gradePoint = 0;
}

    let cgpa = gradePoint;

    document.getElementById("result").innerHTML =
        "CGPA = " + cgpa;
}