import { isInProcess,isErrorOccure } from "./script.js";

export function countLength() {
	//iN The jquery after $(id) we can get all the cells 
	var cells = document.querySelectorAll("td");

	var ans = 0;
	if(isInProcess==true)
	{
		for (var i = 1; i <= cells.length; i++) {
			if ($(cells[i-1]).hasClass("success")==false) {
				
			}
			else
			{
				ans++;
			}
		}
	}
	else
	{
		isErrorOccure=true;
	}
	return ans;
}
