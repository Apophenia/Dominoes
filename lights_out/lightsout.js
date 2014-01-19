window.onload = function () {

    var grid = [];
    var game = document.getElementById("game");

    for (var i = 0; i < 5; i++) {
	var row = [];
	var boundingBox = document.createElement("div");
	for (var j = 0; j < 5; j++) {
	    var box = document.createElement("button");
	    box.setAttribute("data-row", i);
	    box.setAttribute("data-column", j);
	    box.id = "light" + "-" + i + "-" + j;
	    box.className = "box unlit";
	    row.push(box);
	    boundingBox.appendChild(box);
	}
	game.appendChild(boundingBox);
	grid.push(row);
    };

    var boxes = document.getElementsByClassName("box");

    for (var i = 0, len = boxes.length; i < len; i++) {
	boxes[i].addEventListener("click", function (event) {
	    var square = event.target;
	    makeMove(square);
	});
    };

    function toggle(square) {
	if (square.className === "box unlit") {
	    square.className = "box lit";
	}
	else {
	    square.className = "box unlit";
	}
    }

    function isTopmost(row) {
	return (row < 1);
    }

    function isBottommost(row) {
	return (row > 3);
    }

    function isLeftmost(column) {
	return (column < 1);
    }

    function isRightmost(column) {
	return (column > 3);
    }

    function makeMove(square) {
	var row = square.getAttribute("data-row");
	var column = square.getAttribute("data-column");

	row = parseInt(row);
	column = parseInt(column);

	toggle(square);

	if (!isTopmost(row)) {
	    toggle(grid[row - 1][column]);
	}
	if (!isBottommost(row)) {
	    toggle(grid[row + 1][column]);
	}
	if (!isLeftmost(column)) {
	    toggle(grid[row][column - 1]);
	}
	if (!isRightmost(column)) {
	    toggle(grid[row][column + 1]);
	}
	if (isWon(boxes)) {
	    window.alert("You win!");
	}
    }

    function isWon(boxes) {
	for (var i = 0, len = boxes.length; i < len; i++) {
	    if (boxes[i].className === "box lit") {
		return false;
	    }
	}
	return true;
    }


    function setGame(array) {
	for (var i = 0, len = boxes.length; i < len; i++) {
	    if (array[i]) {
		console.log(i);
		boxes[i].className = "box lit";
	    }
	}
    }

    var diagonals = [true, false, false, false, false,
		     false, true, false, false, false,
		     false, false, true, false, false,
		     false, false, false, true, false,
		     false, false, false, false, true];

    setGame(diagonals);
}
