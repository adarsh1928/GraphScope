
import {isDigonalMovesAllowed,TotalC,TotalR} from "./script.js"

export function getNextValidBlock(i,j) {
    var answer = [];
	
	if (i < (TotalR - 1)&&j<(TotalC)) { answer.push([i + 1, j]); }
	if (j < (TotalC - 1)&&i<TotalR)  { answer.push([i, j + 1]); }
	
	// isDigonalMovesAllowed moves
	if (isDigonalMovesAllowed == true) {  
		
		if (i > 0 && j > 0) { answer.push([i - 1, j - 1]); }
		if (i > 0 && j + 1 < TotalC) {
			answer.push([i - 1, j + 1]);
		}
		if (i + 1 < TotalR && j > 0) {
			answer.push([i + 1, j - 1]);
		}
		if (i + 1 < TotalR && j + 1 < TotalC) {
			answer.push([i + 1, j + 1]);
		}
	}
	if (i > 0&&j>=0) { answer.push([i - 1, j]); }
	if (j > 0&&i>=0) { answer.push([i, j - 1]); }

	return answer;
}


export default getNextValidBlock