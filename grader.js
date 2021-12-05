if (location.hostname.indexOf("brightspace.com") != -1 && location.pathname == "/d2l/lms/grades/my_grades/main.d2l") {
    // rows of the grades table
    var rows = document.getElementsByClassName("d2l-table")[0].children[0].children;
    // number of columns
    var numCols = rows[0].cells.length;

    // the index of the column to tally
    // ignore heading rows, e.g., "Homework", "Labs"
    // it will be off by 1 because of blank cell on far left of non-heading rows
    // tally the weight column if it is there, otherwise the points column
    var pointsCol = rows[0].cells[2].textContent == "Weight Achieved" ? 3 : 2;

    // if the last row is NOT offset,
    // this means there are NO heading rows
    var noHeadingRows = false;
    if (rows[rows.length - 1].cells.length == numCols) {
        noHeadingRows = true;
        pointsCol -= 1;
    }

    // points earned
    var totalPoints = 0;
    // possible points
    var maxPoints = 0;
    var points;
    var pointsRegex = /([\d-\.]+)(?: \/ ([\d-\.]+))?/;
    for (var i = 1; i < rows.length; i++) {
        // since heading rows have the same # of columns as the first row,
        // look only for rows with more columns
        // or, if this table has no heading rows, do all rows
        if (noHeadingRows || rows[i].cells.length > numCols) {
            // score is formatted "earned / possible"
            points = pointsRegex.exec(rows[i].cells[pointsCol].textContent);
            // if earned points is "-", don't count it
            if (points[1] != "-") {
                totalPoints += Number(points[1]);
                // if nothing to the right of the slash, that score is extra credit
                maxPoints += points[2] ? Number(points[2]) : 0;
            }
        }
    }

    var percentage = totalPoints / maxPoints;
    alert("Earned Points: " + totalPoints + "\nPossible Points: " + maxPoints + "\n\nScore: " + percentage * 100 + "%\nGrade Points: " + percentage * 4);
}
