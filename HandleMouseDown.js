import { TotalC, isInProcess, startCell, tdElements ,endCell,isJustFinished,isWeCanCreatWalls,isEndMoving} from "./script.js";
import ClearBoard from "./ClearBoard.js";

export function HandleMouseDown() {

    const index = Array.from(tdElements).indexOf(this);

    // Calculate the starting index
    const startIndex = startCell[0] * TotalC + startCell[1];

    // Calculate the ending index
    const endIndex = endCell[0] * TotalC + endCell[1];

    // Check if any algorithm is in the running state
    if (!isInProcess) {
        // If the algorithm just finished and is not running, clear the board
        if (isJustFinished && !isInProcess) {
            ClearBoard(true);
            isJustFinished = false;
        }

        // Check if the current index matches the starting index
        if (index === startIndex) {
            isStartMoving = true;
        } else if (index === endIndex) {
            isEndMoving = true;
        } else {
            isWeCanCreatWalls = true;
        }
    } else {
        // If an algorithm is running, ignore the mousedown event
    }
}
