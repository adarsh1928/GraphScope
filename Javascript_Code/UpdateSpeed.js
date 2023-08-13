
import { isErrorOccure } from "./script.js";

export function updateSpeedDisplay(speedOfAnimation) {
	if(isErrorOccure==false)
	{
		if (speedOfAnimation === "Slow") {
			document.querySelector(".speedDisplay").textContent = "Speed: Slow";
		} else if (speedOfAnimation === "Fast") {
			document.querySelector(".speedDisplay").textContent = "Speed: Fast";
		} else if (speedOfAnimation === "Normal") {
			document.querySelector(".speedDisplay").textContent = "Speed: Normal";
		}
		
	}
	return;
}
