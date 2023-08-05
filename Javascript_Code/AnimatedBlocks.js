
import { startCell, TotalC,endCell,animateThisCells,isInProcess,getRecentDelay} from "./script.js";

export async function animateBlocks() {
	
	var cells = $("#tableContainer").find("td");
	
	var delay = getRecentDelay();

	//finding the cell position
	var startIndex =  startCell[1];
	startIndex+=(startCell[0] * (TotalC));
	
	var endIndex =  endCell[1];
	endIndex+=(endCell[0] * (TotalC)) ;

	
	for (var i = 0; i < animateThisCells.length; i++) {
		delay=getRecentDelay();
		var cellCoordinates = animateThisCells[i][0];
		if(isInProcess==true)
		{

			var x = cellCoordinates[0];
			var num = (x * (TotalC));
			var y = cellCoordinates[1];
			
			num+= y;
			if ((num == startIndex || num == endIndex)==false) 
			{ 
				var cell = cells[num];
				var colorClass = animateThisCells[i][1];

			
				// waiting for this and it exicute other code 
				await new Promise(resolve => setTimeout(resolve, delay));

				$(cell).removeClass();
				$(cell).addClass(colorClass);
			}
			else
			{	
				continue; 
				
			}
		}
	}
	// animateThisCells = [];
	return new Promise(resolve => resolve(true));
}
