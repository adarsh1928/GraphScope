import { isInProcess,TotalR, TotalC,isErrorOccure} from "./script.js";

export function creatDistanceMatrix() {
	if(isInProcess==true)
	{
		var costOf = [];
		for (var i = 1; i <= TotalR; i++) {
			var row = [];
			for (var j = 0; j < TotalC; j++) {
				//taking the vector<vector>> with value of INT_MAX
				row.push(1000000000);
			}
			costOf.push(row);
		}
		return costOf;
	}
	else
	{	console.log("Error");
		isErrorOccure=true;
		return;
	}
}