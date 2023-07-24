


export function gridMake(rows, cols) {
	console.log("OK");
	var grid = "";
	for (let row = rows; row >=1 ; row--) {
		grid += "<tr>";
		for (let col =cols; col >=1; col--) {
			grid += "<td></td>";
		}
		grid += "</tr>";
	}
	grid ="<table>"+grid+"</table>"
	return grid;
}

export default gridMake;