
import { isErrorOccure } from "./script.js";

export function updateSpeedDisplay(speedOfAnimation) {
	if(isErrorOccure==false)
	{
		if (speedOfAnimation == "Slow") {
			$(".speedDisplay").text("Speed: Slow");
		} else if (speedOfAnimation == "Fast") {
			$(".speedDisplay").text("Speed: Fast");
		}else if (speedOfAnimation == "Normal") {
			$(".speedDisplay").text("Speed: Normal");
		} 
	}
	return;
}
