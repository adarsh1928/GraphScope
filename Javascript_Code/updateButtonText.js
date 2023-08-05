
import {isInProcess,algorithm} from "./script.js"

export function updateButtonText() {
    if (isInProcess === false) {
        if (algorithm === "Depth-First Search (DFS)") {
            console.log("okokokoko");
            document.getElementById("startBtn").innerHTML = "Start DFS";
        } else if (algorithm === "Dijkstra") {
            document.getElementById("startBtn").innerHTML = "Start Dijkstra";
        } else if (algorithm === "Greedy Best-First Search") {
            document.getElementById("startBtn").innerHTML = "Start Greedy BFS";
        } else if (algorithm === "Breadth-First Search (BFS)") {
            document.getElementById("startBtn").innerHTML = "Start BFS";
        } else if (algorithm === "A*") {
            document.getElementById("startBtn").innerHTML = "Start A*";
        }
    }
    return;
}


export default updateButtonText