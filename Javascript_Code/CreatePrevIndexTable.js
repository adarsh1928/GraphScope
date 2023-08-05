
import { TotalC,TotalR } from "./script.js";


export function creatPrevIndexTable() {
	var prev = [];
	for (var i = TotalR; i>=1; i--) {
		var row = [];
		for (var j = TotalC ; j>=1 ; j--)
		{
			row.push(null);
		}
		prev.push(row);
	}
	return prev;
}
