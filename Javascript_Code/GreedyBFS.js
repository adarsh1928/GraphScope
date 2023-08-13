
import { creatDistanceMatrix } from "./CreateDistanceMatrix.js";
import { creatPrevIndexTable } from "./CreatePrevIndexTable.js";
import makeVisitedMatrix from "./MakeVisitedMatrix.js";
import { minHeap } from "./MinHeap.js";
import { isInProcess,startCell,endCell,isErrorOccure } from "./script.js";
import { animateBlocks } from "./AnimatedBlocks.js";
import { animateThisCells } from "./script.js";
import getNextValidBlock from "./getNextValidBlock.js";

export function greedyBestFirstSearch() {

	var isPathFound = false;                ///isPathFound =  false
	var prev = creatPrevIndexTable();       ///creating prevIndexTable
	var costs = creatDistanceMatrix();      //creating DistanceMatrix
	var visited = makeVisitedMatrix();      //making VisitedMatrix
	var minimumHeap = new minHeap();        // initializing minHeap


	// isInProcess = true;
	if (isErrorOccure == true) {
		// console.log("Error");
		return;
	}

	costs[startCell[0]][startCell[1]] = 0;                                                     //making startcell distance  = 0
	minimumHeap.push([0, [startCell[0], startCell[1]]]);                                       //pushing elements into the minHeap Like a dijkstra's 
	animateThisCells.push([[startCell[0], startCell[1]], "searching"]);



	while (minimumHeap.isEmpty() == false) {

		var cell = minimumHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j] == false) {
			visited[i][j] = true;
			animateThisCells.push([[i, j], "visited"]);



			if (isInProcess == true && i == endCell[0] && j == endCell[1]) {
				isPathFound = true;                                                              //if target Node is Found
				break;
			}



			var answer = getNextValidBlock(i, j);				//generating all  the nextValid blocks


			for (var k = 1; k <= answer.length; k++) {

				var n = answer[k - 1][1];
				var m = answer[k - 1][0];


				if (visited[m][n] == false) {


					var newCost = Math.abs(endCell[0] - m) * Math.abs(endCell[0] - m);  //assuming the hueristic value  targetnode(i,j)
					// (endCell[0]-m)*(endCell[0]-m)

					var zz = Math.abs(endCell[1] - n);
					newCost += zz;                                  //taking the total newCost as a heuristic cost



					if (isInProcess == true && newCost < costs[m][n])   //newCost is less than the current cost 
					{
						prev[m][n] = [i, j];
						costs[m][n] = newCost;

						minimumHeap.push([newCost, [m, n]]);
						animateThisCells.push([[m, n], "searching"]);
					}
				} else {
					continue;
				}

			}


		}
		else {
			continue;
		}

	}
	// Make any nodes still in the heap "visited"
	while (minimumHeap.isEmpty() != true) {
		var cell = minimumHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j] == false) {
			visited[i][j] = true;
			animateThisCells.push([[i, j], "visited"]);
		}
		else {
			continue;
		}

	}
	// If a path was found, illuminate it
	if (isPathFound == true) {
		var i = endCell[0];
		var j = endCell[1];
		animateThisCells.push([endCell, "success"]);
		if (isErrorOccure == true) {

			// console.log("Error Occured");
		}
		while (prev[i][j] != null && isErrorOccure == false) {

			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			animateThisCells.push([[i, j], "success"]);
			if ((prev[i][j] != null) == false) {
				break;
			}
		}
	}
	else {
		// do nothing
	}
	return isPathFound;
}
