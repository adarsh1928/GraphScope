

import { minHeap } from "./MinHeap.js";
import { creatDistanceMatrix } from "./CreateDistanceMatrix.js";
import { creatPrevIndexTable } from "./CreatePrevIndexTable.js";
import { isErrorOccure,isInProcess ,startCell,endCell} from "./script.js";
import makeVisitedMatrix from "./MakeVisitedMatrix.js";
import { animateThisCells } from "./script.js";
import getNextValidBlock from "./getNextValidBlock.js";

export function AStar() {

	var isPathFound = false;                                        //isPthFound False
	var minimumHeap = new minHeap();                                //Initializing minHeap
	var tempCostOfTheBock = 0;
	var prev = creatPrevIndexTable(); //creatPrevIndexTable
	var costs = creatDistanceMatrix();//DistanceMatrix
	if (isErrorOccure == true) {
		return false;
	}
	else {

		if (isInProcess == true) {
			var visited = makeVisitedMatrix();
			var costOf = creatDistanceMatrix();    //creating another array costOf
		}
		else {
			return;
		}
		costOf[startCell[0]][startCell[1]] = 0;     //Initializing by the starting node
		costs[startCell[0]][startCell[1]] = 0;      //starting nODE Distance would be 0

		minimumHeap.push([0, [startCell[0], startCell[1]]]);
		animateThisCells.push([[startCell[0], startCell[1]], "searching"]);


		while (minimumHeap.isEmpty() == false) {
			var cell = minimumHeap.getMin();  //getting minimum Distance from the top of the minHeap
			var i = cell[1][0];
			var j = cell[1][1];

			if (visited[i][j] == false) {
				visited[i][j] = true;
				animateThisCells.push([[i, j], "visited"]);


				if (isInProcess == true && i == endCell[0] && j == endCell[1]) {
					isPathFound = true;    //if it is target node
					break;
				}
				var answer = getNextValidBlock(i, j);   //generate all blocks to move
				for (var k = 1; k <= answer.length; k++) {
					var m = answer[k - 1][0];
					var n = answer[k - 1][1];
					if (visited[m][n] == false) {
						var newDistance = costOf[i][j] + 1;                     //considering newDistance as (prevDistance+1)
						if (isInProcess == true && newDistance < costOf[m][n]) {
							costOf[m][n] = newDistance;                      //if newDistance < costOf[m][n]
							prev[m][n] = [i, j];
							var tempIndex = [m, n];
							animateThisCells.push([tempIndex, "searching"]);
						}
						var xDist = Math.abs(endCell[0] - m)                  //calculating the heuristic value for the new point 
						var yDist = Math.abs(endCell[1] - n);
						var newCost = costOf[i][j] + xDist + yDist;
						tempCostOfTheBock = newCost;
						if (isInProcess == true && tempCostOfTheBock < costs[m][n]) {
							costs[m][n] = newCost;
							minimumHeap.push([newCost, [m, n]]);
						}
					}
					else {
						continue;
					}
				}
			}
			else {
				continue;
			}

		}
		while (minimumHeap.isEmpty() != true) {

			//after visiting all the possible nodes
			//if target found or not found make animate of all visited cells
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



		if (isPathFound == false) {

		}
		else {

			//success while finding the path 
			var j = endCell[1];
			var i = endCell[0];
			if (isInProcess == false) {
				isErrorOccure = true;
			}
			animateThisCells.push([endCell, "success"]);

			while (prev[i][j] != null) {
				if (isErrorOccure == true) {
					console.log("Error");
				}
				var prevCell = prev[i][j];
				i = prevCell[0];
				j = prevCell[1];
				if (isInProcess == true) {
					animateThisCells.push([[i, j], "success"]);
				}
				else {

				}
			}
		}
		return isPathFound;
	}
}