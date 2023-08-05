
import { TotalR, TotalC, startCell, endCell } from './script.js';

export function ClearBoard(keepWalls) {
	//.find() get all the elements and we can take a length of that
	var cells = $("#tableContainer").find("td");
	var startIndex = (startCell[0] * (TotalC));
	startIndex+=startCell[1];
	var endIndex = (endCell[0] * (TotalC));
	endIndex+=endCell[1];
    // console.log(" Printing the cells",cells);

	for (var i = 1; i <= cells.length; i++) {
		let isWall = $(cells[i-1]).hasClass("wall");
		$(cells[i-1]).removeClass();//if it has a Wall call Then remove it 
		if ((i-1) == endIndex) {
			$(cells[i-1]).addClass("end");//if it is  a end index then add the end class
		}else if ((i-1) == startIndex) {
			$(cells[(i-1)]).addClass("start"); //if it is a start index then add the start class
		} 
		else if ((keepWalls && isWall)==true) 
		{
			$(cells[(i-1)]).addClass("wall");
		}
	}
}

export default ClearBoard