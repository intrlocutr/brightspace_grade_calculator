// rows of the grades table
var rows = document.getElementsByClassName("d2l-table")[0].children[0].children;
// number of columns
var numCols = rows[0].cells.length;

// the index of the column to tally
// ignore heading rows, e.g., "Homework", "Labs"
// so it will be off by 1 because of blank cell on far left of children
// tally the weight column if it is there, otherwise the points column
var pointsCol = rows[0].cells[2].textContent == "Weight Achieved" ? 3 : 2;

// points earned
var totalPoints = 0;
// possible points
var maxPoints = 0;
for (var i = 1; i < rows.length; i++) {
    // since heading rows have the same # of columns as the first row,
    // look only for rows with more columns
    // again, the blank space on the left is a column
    if (rows[i].cells.length > numCols) {
	// score is formatted "earned / possible"
	var points = rows[i].cells[pointsCol].textContent.split(" / ");
	// if earned points is "-", don't count it
	if (points[0] != "-") {
	    totalPoints += Number(points[0]);
	    // if nothing to the right of the slash, that score is extra credit
	    maxPoints += points[1] ? Number(points[1]) : 0;
	}
    }
}

var percentage = totalPoints / maxPoints;
alert("Earned Points: " + totalPoints + "\nPossible Points: " + maxPoints + "\n\nScore: " + percentage * 100 + "%\nGrade Points: " + percentage * 4);
