
import { Queue } from "./Queue.js";
import { creatPrevIndexTable } from "./CreatePrevIndexTable.js";
import { startCell,animateThisCells ,isErrorOccure,endCell,isInProcess} from "./script.js";
import makeVisitedMatrix from "./MakeVisitedMatrix.js";
import getNextValidBlock from "./getNextValidBlock.js";



export function BFS() {
	var visited = makeVisitedMatrix();//take viisted array where user had put any wall or something like that
	var simpleQueue = new Queue(); //Initialize The stack 
	var isPathFound = false;
	// isInProcess = true;
	var prev = creatPrevIndexTable();  //create prev matrix for the backtracking purpose 
	simpleQueue.enqueue(startCell);  //Inserting the element inside the queue
	animateThisCells.push(startCell, "searching");
	visited[startCell[0]][startCell[1]] = true;//making visited 

	while (simpleQueue.empty() == false && isErrorOccure == false) // while not queue empty()
	{
		var cell = simpleQueue.dequeue();//removing the top element 
		var i = cell[0];
		var j = cell[1];
		animateThisCells.push([cell, "visited"]);
		if ((i == endCell[0] && j == endCell[1]) == false) {
			if (isErrorOccure == true) {
				console.log("Error");
				break;
			}
			var answer = getNextValidBlock(i, j); //if it not a answer then generating alll the valid walk from that point every time
			for (var k = 1; k <= answer.length; k++) {
				var m = answer[k - 1][0];
				var n = answer[k - 1][1];
				if ((visited[m][n] == false)) {
					visited[m][n] = true;//making visited
					prev[m][n] = [i, j];//interting inside prev array
					animateThisCells.push([answer[k - 1], "searching"]);
					simpleQueue.enqueue(answer[k - 1]);;
				}
				else {
					continue;
				}
			}
		}
		else {
			isPathFound = true; /// success
			break;
		}

	}
	while (simpleQueue.empty() == false) {
		var cell = simpleQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		animateThisCells.push([cell, "visited"]); ///making all the elements visited which is inside the queue
	}

	if (isPathFound == false) {

	}
	else {
		//if it is success assigning the class successs
		var c = endCell[1];
		var r = endCell[0];
		animateThisCells.push([[r, c], "success"]);
		while (prev[r][c] != null) {
			if (isInProcess == false) {
				break;
			}
			var prevCell = prev[r][c];
			r = prevCell[0];
			c = prevCell[1];
			animateThisCells.push([[r, c], "success"]);
		}
	}
	return isPathFound;
}