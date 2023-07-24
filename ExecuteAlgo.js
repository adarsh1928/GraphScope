
import { isErrorOccure,isInProcess,algorithm} from "./script.js";

export function executeAlgo() {
	//console.log("I AM INSIDE THE ALGORITHM RUNNING FUNCTION ");
	//console.log(algorithm);


	if (isErrorOccure==false&& isInProcess==true&&algorithm == "Depth-First Search (DFS)") {
		var visited = makeVisitedMatrix();
		var isPathFound = DFS(startCell[0], startCell[1], visited);//passing the i,j start row,column


	} else if (isErrorOccure==false&&algorithm == "Breadth-First Search (BFS)") {
		var isPathFound = BFS();


	} else if (isErrorOccure==false&&algorithm == "Dijkstra") {
		var isPathFound = dijkstra();
		// console.log(isPathFound);


	} else if (isErrorOccure==false&&algorithm == "A*") {
		var isPathFound = AStar();


	} else if (isErrorOccure==false&&algorithm == "Greedy Best-First Search") {
		var isPathFound = greedyBestFirstSearch();

		
	} 
	return isPathFound;
}