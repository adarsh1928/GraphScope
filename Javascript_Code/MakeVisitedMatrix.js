
import {isInProcess,TotalR,TotalC,isCellisAWall} from "./script.js"

export function makeVisitedMatrix() {
    var ans = [];
	var cells = $("#tableContainer").find("td");
	console.log("PRINTING THE ALL CELLS",cells);
	for (var i = 1; i<=TotalR&&isInProcess==true; i++) 
	{
		var row = [];
		for (var j = 1; j<=TotalC ; j++) 
		{
			//passing the (row,col,cells);
			if (isCellisAWall(i-1, j-1, cells)==false) 
			{
				//no wall
				row.push(false);
			} 
			else if(isInProcess==true)
			{	
				//wall present
				row.push(true);	
			}
		}
		ans.push(row);
	}
	return ans;
}


export default makeVisitedMatrix