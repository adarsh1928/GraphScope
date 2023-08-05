
import { startCell,endCell,animateThisCells,isInProcess,isErrorOccure } from "./script.js";
import { creatDistanceMatrix } from "./CreateDistanceMatrix.js";
import { creatPrevIndexTable } from "./CreatePrevIndexTable.js";
import makeVisitedMatrix from "./MakeVisitedMatrix.js";
import { minHeap } from "./MinHeap.js";
import getNextValidBlock from "./getNextValidBlock.js";

export function dijkstra() {

	var isPathFound = false;//pathFound or not ?
	var minimumHeap = new minHeap();// minHeap() Initialization

	var prev = creatPrevIndexTable();//For the backTracking and PathFinding ...............
	var costOf = creatDistanceMatrix();//creating a matrix and Initializing with INT_MAX .................

	if(isInProcess==true)
	{
		var visited = makeVisitedMatrix();//taking the visited matrix to store the value at each point 
		costOf[startCell[0]][startCell[1]] = 0; //starting point of the cost would be 0
		minimumHeap.push([0, [startCell[0], startCell[1]]]);//pushing the minHeap  (distance =0, {startingNoderow,startingNodecol})
		animateThisCells.push([[startCell[0], startCell[1]], "searching"]);

		while (!minimumHeap.isEmpty()) 
		{
			var cell = minimumHeap.getMin();//find the top 
			var i = cell[1][0];     //[distance,[i,j]]
			var j = cell[1][1];     

			if (visited[i][j]==false)
			{
				visited[i][j] = true;
				animateThisCells.push([[i, j], "visited"]);

				if ((i == endCell[0] && j == endCell[1])!=true)
				{
					//if it is not a target node
				}
				else
				{
					//if it is target node
					isPathFound = true;
					break;
				}

				var answer = getNextValidBlock(i, j); //same as DFS find the available points to move

				if(isErrorOccure==false)
				{
                    //Taking the available steps which we can move 
					for (var k = 0; k < answer.length; k++) {
						
						//taking the (row,col) 
						var m = answer[k][0];
						var n = answer[k][1];


						if (visited[m][n]==false) 
						{ 
							var newDistance = costOf[i][j];
							newDistance++; //  increasing the one step  to move 


							if (newDistance < costOf[m][n]) {
								costOf[m][n] = newDistance;             //if there is a another path where the distance is smaller than previous store newDistance
								prev[m][n] = [i, j];                    //store into the prev array whenever there is a may need of backtrack
								minimumHeap.push([newDistance, [m, n]]);//pushing a newDistance into the minHeap
								animateThisCells.push([[m, n], "searching"]);
							}

						}
						else
						{	
							continue; 
						}
					}
				}
			} 
			else
			{ 
				continue; 
			}


		}

		if(isPathFound==false) 
		{
			// do nothing
		}
		else
		{
			//isPathFound == true   ,   we got our successFull Path
			var i = endCell[0];
			var j = endCell[1];
			animateThisCells.push([endCell, "success"]);
			while (prev[i][j] != null&&isInProcess==true) 
			{
				var prevCell = prev[i][j];
				j = prevCell[1];//prevCell is fpr the backtaracking purpose
				i = prevCell[0];
				animateThisCells.push([[i, j], "success"]);
			}
		}
		return isPathFound;
	}
	else
	{	
		isErrorOccure=true;
		return;
	}
}

