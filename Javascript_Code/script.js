import makeVisitedMatrix from "./MakeVisitedMatrix.js";
import { animateBlocks } from "./AnimatedBlocks.js";
import { countLength } from "./CountLength.js";
import { showResult } from "./ShowResult.js";
import { BFS } from "./BFS.js";
import { DFS } from "./DFS.js";
import { AStar } from "./Astar.js";
import { creatDistanceMatrix } from "./CreateDistanceMatrix.js";
import { minHeap } from "./MinHeap.js";
import { dijkstra } from "./Dijsktra.js";
import { Queue } from "./Queue.js";
import { greedyBestFirstSearch } from "./GreedyBFS.js";
import { updateSpeedDisplay } from "./UpdateSpeed.js";
import getNextValidBlock from "./getNextValidBlock.js";
import { gridMake } from "./GridMake.js"
import { ClearBoard } from "./ClearBoard.js"
import { updateButtonText } from "./updateButtonText.js"


// your-file.js
export var TotalC = 80;
export var TotalR = 25;
export var startCell = [6, 18];
export var endCell = [18, 56];
export var isInProcess = false;
export var isDigonalMovesAllowed = false;
export var animateThisCells = [];
export var isErrorOccure = false;
export var isWeCanCreatWalls = false;
export var algorithm = null;
export var isJustFinished = false;
export var speedOfAnimation = "Fast";
export var animationState = null;
export var isStartMoving = false;
export var isEndMoving = false;

// Function to allow or not to allow the diagonal Move in the graph
$('#boxx').click(function () {
	if (isDigonalMovesAllowed == false) {
		isDigonalMovesAllowed = true;
	}
	else {
		isDigonalMovesAllowed = false;
	}
});

gridMake()

// make html table
//calling the gridMake function
var HTMLgrid = gridMake(TotalR, TotalC);

$("#tableContainer").append(HTMLgrid);
//----------------------------------------------------------------------------------------------------

ClearBoard()

//--
updateButtonText()


function update(message) {
	const resultsIcon = document.querySelector("#resultsIcon");
	const resultsDiv = document.querySelector("#results");
	const durationDiv = document.querySelector("#duration");
	const lengthDiv = document.querySelector("#length");

	resultsIcon.className = "fas fa-exclamation";
	resultsDiv.style.backgroundColor = "#ffc107";
	lengthDiv.textContent = "";

	if (message === "wait") {
		durationDiv.textContent = "Please wait for the algorithm to finish.";
	}
}


// Get all the td elements and add a mousedown event listener to each of them
export const tdElements = document.querySelectorAll("td");

tdElements.forEach(td => {
	td.addEventListener("mousedown", function () {
		// Get the index of the current td element
		const index = Array.from(tdElements).indexOf(this);

		// Calculate the starting index
		const startIndex = startCell[0] * TotalC + startCell[1];

		// Calculate the ending index
		const endIndex = endCell[0] * TotalC + endCell[1];

		// Check if any algorithm is in the running state
		if (!isInProcess) {
			// If the algorithm just finished and is not running, clear the board
			if (isJustFinished && !isInProcess) {
				ClearBoard(true);
				isJustFinished = false;
			}

			// Check if the current index matches the starting index
			if (index === startIndex) {
				isStartMoving = true;
			} else if (index === endIndex) {
				isEndMoving = true;
			} else {
				isWeCanCreatWalls = true;
			}
		} else {
			// If an algorithm is running, ignore the mousedown event
		}
	});
});


const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function () {
	// Disable the checkbox with id "boxx"
	const checkbox = document.getElementById("boxx");
	checkbox.disabled = true;

	// Check if an algorithm is selected
	if (algorithm !== null) {
		// Check if an algorithm is already running
		if (isInProcess) {
			update("wait"); // Pass the message "wait" to the update function
			return;
		} else {
			// If an algorithm is not running, proceed with running the selected algorithm
			runAlgoritham(algorithm);
		}
	} else {
		// If no algorithm is selected, show an alert message
		alert("Please select an Algorithm");
		return;
	}

	// You can re-enable the checkbox here if needed
	// checkbox.disabled = false;
});


//This is a check function
function Check() {
	if (isInProcess === false) {
		// If the algorithm is not running, enable the checkbox with id "boxx"
		const checkbox = document.getElementById("boxx");
		checkbox.disabled = false;
	} else {
		// If the algorithm is running, do nothing (the commented console.log can be removed)
		// console.log("My Interval called Inside check function");
	}
}

setInterval((Check), 1000);



tdElements.forEach(td => {
	td.addEventListener("mouseenter", function () {
		// Base case: If no walls can be created and neither start nor end cells are moving, and the algorithm is not running
		if (!isWeCanCreatWalls && !isStartMoving && !isEndMoving && !isInProcess) {
			return;
		}

		// Get the index of the current td element
		const index = Array.from(tdElements).indexOf(this);

		// Take start and end index
		const startIndex = startCell[1] + startCell[0] * TotalC;
		const endIndex = endCell[0] * TotalC + endCell[1];

		if (!isInProcess) {
			// If the algorithm is not running
			if (isJustFinished) {
				// If the algorithm just finished, clear the board
				ClearBoard(true);
				isJustFinished = false;
			}

			if (isStartMoving && index !== endIndex) {
				// If start cell is moving and the current index is not the end index, shift the start cell
				shiftEndOrStart(startIndex, index, "start");
			} else if (isEndMoving && index !== startIndex) {
				// If end cell is moving and the current index is not the start index, shift the end cell
				// console.log("this is executed");
				shiftEndOrStart(endIndex, index, "end");
			} else if (index !== startIndex && index !== endIndex) {
				// If not moving start/end cells, toggle the wall class for the current td element
				// console.log("mid");
				this.classList.toggle("wall");
			}
		} else {
			// If the algorithm is running, do nothing
		}
	});
});


tdElements.forEach(td => {
	td.addEventListener("click", function () {
		// Identify the current cell index
		const index = Array.from(tdElements).indexOf(this);

		// Take start and end index
		const startIndex = startCell[1] + startCell[0] * TotalC;
		const endIndex = endCell[0] * TotalC + endCell[1];

		if (!isInProcess && index !== startIndex && index !== endIndex) {
			// If the algorithm is not running and the index is neither start nor end index

			if (!isJustFinished) {
				// If the algorithm is not just finished, proceed with toggling the "wall" class
				this.classList.toggle("wall");
			} else {
				// If the algorithm just finished, clear the board
				ClearBoard(true);
				isJustFinished = false;
			}
		} else {
			// In progress state or the index is the same as the starting or ending index, do nothing
		}
	});
});

// when mouse leave element
document.body.addEventListener("mouseup", function () {
	isWeCanCreatWalls = false;
	isEndMoving = false;
	isStartMoving = false;
});

// Get the clear button element and add a click event listener to it
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function () {
	if (!isInProcess) {
		// If the algorithm is not running
		ClearBoard(false);
	} else {
		// If the algorithm is running, show the "wait" message
		update("wait");
	}
});

const algorithmDropdownItems = document.querySelectorAll("#algorithms .dropdown-item");
algorithmDropdownItems.forEach(item => {
	item.addEventListener("click", function () {
		if (isInProcess) {
			update("wait");
			return;
		} else if (!isInProcess) {
			algorithm = this.textContent;
			updateButtonText();
		}
	});
});



function shiftEndOrStart(prevIndex, newIndex, startOrEnd) {
	var newCellY = newIndex % TotalC;
	var newCellX = Math.floor((newIndex - newCellY) / TotalC);
	if (startOrEnd == "start") {
		startCell = [newCellX, newCellY];
	} else {

		endCell = [newCellX, newCellY];
	}
	// let keepwall=keepWalls
	ClearBoard(true);
	return;
}



// For backtracking and Pathfinding 
export function creatPrevIndexTable() {
	var prev = [];
	for (var i = TotalR; i >= 1; i--) {
		var row = [];
		for (var j = TotalC; j >= 1; j--) {
			row.push(null);
		}
		prev.push(row);
	}
	return prev;
}


export function isCellisAWall(i, j, cells) {
	if (isInProcess == true) {
		//finding the cell location 
		var cellNum = (i * (TotalC));
		cellNum += j;
		return $(cells[cellNum]).hasClass("wall");
	}
	else {
		return;
	}
}

export function getRecentDelay() {
	var ans;
	if (speedOfAnimation === "Normal") {
		ans = 10;
	}
	else if (speedOfAnimation === "Slow") {
		ans = 200;
	}
	else {
		ans = 1;
	}
	return ans;
}


document.getElementById("speed").addEventListener("click", function(event) {
	// Check if the clicked element has the class "dropdown-item"
	if (event.target.classList.contains("dropdown-item")) {
	  // Get the text content of the clicked element (the speed value)
	  var speedText = event.target.textContent;
	  
	  // Assign the speed value to the speedOfAnimation variable
	  speedOfAnimation = speedText;
	  
	  // Call the updateSpeedDisplay function with the updated speed value
	  updateSpeedDisplay(speedOfAnimation);
	}
  });
  

async function runAlgoritham(algorithm) {
	isInProcess = true;
	ClearBoard(true);//keep wall as it is 
	var isPathFound = executeAlgo();

	await animateBlocks();
	if (isPathFound) {
		showResult(true, countLength());
	} else {
		showResult(false, countLength());
	}
	isInProcess = false;
	isJustFinished = true;
}


function executeAlgo() {

	if (isErrorOccure == false && isInProcess == true && algorithm == "Depth-First Search (DFS)") {
		var visited = makeVisitedMatrix();
		var isPathFound = DFS(startCell[0], startCell[1], visited);//passing the i,j start row,column


	} else if (isErrorOccure == false && algorithm == "Breadth-First Search (BFS)") {
		var isPathFound = BFS();


	} else if (isErrorOccure == false && algorithm == "Dijkstra") {
		var isPathFound = dijkstra();
		// console.log(isPathFound);


	} else if (isErrorOccure == false && algorithm == "A*") {
		var isPathFound = AStar();


	} else if (isErrorOccure == false && algorithm == "Greedy Best-First Search") {
		var isPathFound = greedyBestFirstSearch();


	}
	return isPathFound;
}

// Clearing bord and also keep start and ending points
ClearBoard();




