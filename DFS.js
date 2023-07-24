
import { animateThisCells,endCell,isErrorOccure } from "./script.js";
import getNextValidBlock from "./getNextValidBlock.js";

export function DFS(i, j, visited) {
	if ((i == endCell[0] && j == endCell[1])==false) {
		//  source==target
		 //do nothing
	}
	else
	{
		animateThisCells.push([[i, j], "success"]);
		return true;
	}
	
	animateThisCells.push([[i, j], "searching"]);
	visited[i][j] = true;

	var nextBlocks = getNextValidBlock(i, j);//find the nextvalid blocks by standing at current point
	for (var k = 1; k <= nextBlocks.length; k++) {
		var m = nextBlocks[k-1][0];
		var n = nextBlocks[k-1][1];

		if (visited[m][n]==true)
		{
               //if the cell is already visited ignore it. 
		}
		else
		{
            //apply the recursion try for evry possible state 
			var isPathFound = DFS(m, n, visited);
			if (isPathFound==false)
			{
                 //if notPathFound return from there 
			} 
			else
			{
				animateThisCells.push([[i, j], "success"]);
				return true;
			}
		}
	}
	if(isErrorOccure==false)
	{
		animateThisCells.push([[i, j], "visited"]);
	}
	return false;
}