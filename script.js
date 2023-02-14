var TotalR = 25; 
var TotalC = 80; 

var startCell = [10, 18];
var endCell = [18, 56];
var isInProcess = false;  // this shows that algo is runing or not


var isDigonalMovesAllowed = false;


// Digonal Move Button
$('#boxx').click(function () {
	if (isDigonalMovesAllowed == false) {

		isDigonalMovesAllowed = true;

	}
	else {

		isDigonalMovesAllowed = false;
	}
});


var animateThisCells = [];
var isErrorOccure=false;
var isWeCanCreatWalls = false;
var algorithm = null;
var isJustFinished = false;
var speedOfAnimation = "Fast";
var animationState = null;

var isStartMoving = false;
var isEndMoving = false;





// genrating grid using js
function gridMaker(rows, cols) {
	console.log("OK");
	var grid = "";
	for (row = rows; row >=1 ; row--) {
		grid += "<tr>";
		for (col =cols; col >=1; col--) {
			grid += "<td></td>";
		}
		grid += "</tr>";
	}
	grid ="<table>"+grid+"</table>"
	return grid;
}

// make html table
var HTMLgrid = gridMaker(TotalR, TotalC);
$("#tableContainer").append(HTMLgrid);



function Queue() {
	this.stack = new Array();
	this.dequeue = function () {
		return this.stack.pop();
	}

	this.enqueue = function (item) {
		this.stack.unshift(item);
		return;
	}
	this.empty = function () {
		 if(this.stack.length != 0)
		 {
			return false;
		 }
		 else{
			 return true;
		 }
	}
	this.clear = function () {
		this.stack = new Array();
		return;
	}
}


function minHeap() {
	this.heap = [];
	this.isEmpty = function () {
		if(this.heap.length != 0)
		{
			return false;
		}
		else if(this.heap.length==0)
		{
			return true;
		}
	}
	this.clear = function () {
		// clear this heap 
		this.heap = [];
		return;
	}
	this.getMin = function () {
		if (this.isEmpty()!=false) {
			return null;
		}
		else
		{
			var mini = this.heap[0];
			this.heap[0] = this.heap[this.heap.length - 1];
			this.heap[this.heap.length - 1] = mini;
			this.heap.pop();
			if (this.isEmpty()==true) 
			{
				
			}
			else
			{
				this.siftDown(0);
			}
			return mini;
		}
	}
	
	this.parent = function (index) {
		if (index == 0) {
			return null;
		}
		else if(index!=0)
		{
			return Math.floor((index - 1) / 2);
		}
	}
	this.push = function (item) {
		this.heap.push(item);
		this.siftUp(this.heap.length - 1);
		return;
	}
	this.children = function (index) {
		return [(index + index) + 1, (index + index) + 2];
	}
	this.siftDown = function (index) {
		var children = this.children(index);
		var isLeftChildValid = (children[0] <= (this.heap.length - 1));
		var isRightChildValid = (children[1] <= (this.heap.length - 1));
		var newIndex = index;
		if (isLeftChildValid && this.heap[newIndex][0] > this.heap[children[0]][0]) {
			newIndex = children[0];
		}
		else
		{

		}
		if (isRightChildValid && this.heap[newIndex][0] > this.heap[children[1]][0]) {
			newIndex = children[1];
		}
		else
		{

		}
		if (newIndex === index) 
		{ 
			return; 
		}
		else
		{
			var val = this.heap[index];
			this.heap[index] = this.heap[newIndex];
			this.heap[newIndex] = val;
			this.siftDown(newIndex);
			return;
		}
	}
	this.siftUp = function (index) {
		var parent = this.parent(index);
		if (parent !== null && this.heap[index][0] < this.heap[parent][0]) {
			var val = this.heap[index];
			this.heap[index] = this.heap[parent];
			this.heap[parent] = val;
			this.siftUp(parent);
		}
		else
		{

		}
		return;
	}
}



// making walls and removing walls
$("td").mousedown(function () {
	var index = $("td").index(this);
	var startIndex = (startCell[0] * (TotalC)) ;
	startIndex+= startCell[1];
	var endIndex = (endCell[0] * (TotalC)) ;
	endIndex+= endCell[1];
	if (isInProcess != true) {

		if (isJustFinished && isInProcess == false)
		{
			clearBoard(keepWalls = true);
			isJustFinished = false;
		}
		if (index == startIndex) {
			isStartMoving = true;
		} 
		else if (index == endIndex) 
		{	//console.log("11112344");
			isEndMoving = true;
		} 
		else if(index != startIndex&&index != endIndex)
		{
			isWeCanCreatWalls = true;
		}
	}
	else
	{

	}
});


// start button
$("#startBtn").click(function () {
	
	$("#boxx").prop("disabled", true);
	if (algorithm != null) 
	{ 
		if (isInProcess==true) 
		{ 
			update("wait"); 
			return; 
		}
		else
		{
			
		}
		runAlgoritham(algorithm);
	}
	else
	{
		
		alert("Please select an Algoritham");
		return;
	}
	// $("#boxx").prop("disabled", false);

	
});

function Check()
{
	if(isInProcess==false)
	{
		$("#boxx").prop("disabled", false);
	}
}
setInterval((Check) , 1000);




// mouse pointer is over the selected element
$("td").mouseenter(function () {
	
	if (!isWeCanCreatWalls && !isStartMoving && !isEndMoving&&isInProcess==false) 
	{ 	
		return; 
	}
	// console.log("OKOKOK");
	// console.log("isEnding moving="+isEndMoving);
	var index = $("td").index(this);
	var startIndex = startCell[1];
	startIndex+=(startCell[0] * (TotalC)) ;
	var endIndex = (endCell[0] * (TotalC));
	endIndex+= endCell[1];
	
	if (isInProcess==false) 
	{
		if (isJustFinished==true) 
		{
			clearBoard(keepWalls = true);
			isJustFinished = false;
		}
		
		if (isStartMoving==true && index != endIndex) 
		{
			shiftEndOrStart(startIndex, index, "start");
		} 
		else if (isEndMoving==true && index != startIndex) {
			console.log("this is exicuted");
			shiftEndOrStart(endIndex, index, "end");
		} 
		else if (index != startIndex && index != endIndex) {
			console.log("mid");
			$(this).toggleClass("wall");
		}
		
		
	}
});






$("td").click(function () {
	var index = $("td").index(this);
	var startIndex = startCell[1];
	startIndex+=(startCell[0] * (TotalC)) ;
	var endIndex = (endCell[0] * (TotalC));
	endIndex+= endCell[1];

	if ((isInProcess == false) && !(index == startIndex) && !(index == endIndex)) {
		if(isJustFinished==false) 
		{
			
		}
		else
		{
			clearBoard(keepWalls = true);
			isJustFinished = false;
		}
		$(this).toggleClass("wall");
	}
});


// when mouse leave element
$("body").mouseup(function () {
	isWeCanCreatWalls = false;
	isEndMoving = false;
	isStartMoving = false;
});






$("#clearBtn").click(function () 
{
	if (isInProcess!=false)
	{ 
		update("wait"); 
		return; 
	}
	else
	{
		clearBoard(keepWalls = false);
	}
});



$("#algorithms .dropdown-item").click(function () {
	if (isInProcess==true)
	{ 
		update("wait"); 
		return; 
	}
	else if(isInProcess==false)
	{
		algorithm = $(this).text();
		updateStartBtnText();
	}
	
});


function shiftEndOrStart(prevIndex, newIndex, startOrEnd){
	var newCellY = newIndex % TotalC;
	var newCellX = Math.floor((newIndex - newCellY) / TotalC);
	if (startOrEnd == "start"){
    	startCell = [newCellX, newCellY];
    } else {

    	endCell = [newCellX, newCellY];
    }
    clearBoard(keepWalls = true);
    return;
}



function getNextValidBlock(i, j) {
	var answer = [];
	
	if (i < (TotalR - 1)&&j<(TotalC)) { answer.push([i + 1, j]); }
	if (j < (TotalC - 1)&&i<TotalR)  { answer.push([i, j + 1]); }
	
	// isDigonalMovesAllowed moves
	if (isDigonalMovesAllowed == true) {  
		
		if (i > 0 && j > 0) { answer.push([i - 1, j - 1]); }
		if (i > 0 && j + 1 < TotalC) {
			answer.push([i - 1, j + 1]);
		}
		if (i + 1 < TotalR && j > 0) {
			answer.push([i + 1, j - 1]);
		}
		if (i + 1 < TotalR && j + 1 < TotalC) {
			answer.push([i + 1, j + 1]);
		}
	}
	if (i > 0&&j>=0) { answer.push([i - 1, j]); }
	if (j > 0&&i>=0) { answer.push([i, j - 1]); }

	return answer;
}

// For backtracking and Pathfinding 
function creatPrevIndexTable() {
	var prev = [];
	for (var i = TotalR; i>=1; i--) {
		var row = [];
		for (var j = TotalC ; j>=1 ; j--)
		{
			row.push(null);
		}
		prev.push(row);
	}
	return prev;
}



// if wall is there then already visited else not visited
function makeVisitedMatrix() {
	
	var ans = [];
	var cells = $("#tableContainer").find("td");
	
	for (var i = 1; i<=TotalR&&isInProcess==true; i++) 
	{
		var row = [];
		for (var j = 1; j<=TotalC ; j++) 
		{
			if (isCellisAWall(i-1, j-1, cells)==false) 
			{
				row.push(false);
			} 
			else if(isInProcess==true)
			{	
				row.push(true);	
			}
		}
		ans.push(row);
	}
	return ans;
}

// wall or not ?
function isCellisAWall(i, j, cells) {
	if(isInProcess==true)
	{
		var cellNum = (i * (TotalC));
		cellNum+= j;
		return $(cells[cellNum]).hasClass("wall");
	}
	else
	{
		return;
	}
}


// animation and waiting
async function animateBlocks() {
	
	var cells = $("#tableContainer").find("td");
	animationState = null;
	var delay = getRecentDelay();
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
	animateThisCells = [];
	return new Promise(resolve => resolve(true));
}

// Random maze
async function randomMazeCreator() {
	isInProcess = true;
	clearBoard(keepWalls = false);
	var visited = makeVisitedMatrix();
	var walls = makeWallMaze();
	var cells = [startCell, endCell];
	visited[startCell[0]][startCell[1]] = true;
	visited[endCell[0]][endCell[1]] = true;
	walls[startCell[0]][startCell[1]] = false;
	walls[endCell[0]][endCell[1]] = false;
	

	for (var i = 0; i < TotalR; i++) {
		for (var j = 0; j < TotalC; j++) {
			var x=(Math.floor(Math.random()*(3.2)));
			if (walls[i][j]==true && (x)>=1 && answerThatAreWalls(walls[i][j], walls) <1) 
			{
				walls[i][j]=(!walls[i][j]);
			}
		}
	}

	//Animate cells
	var cells = $("#tableContainer").find("td");
	for (var i = TotalR-1 ; i >=0 ; i--) {
		for (var j = TotalC-1 ; j >=0 ; j--) {
			if (isInProcess==true&&(i == 0 || i == (TotalR - 1) || j == 0 || j == (TotalC - 1) || walls[i][j])) {
				animateThisCells.push([[i, j], "wall"]);
			}
		}
	}
	// waiting for animation complete
	await animateBlocks();
	isInProcess = false;
	return;
}

// Random Maze funcation blocking removal
function answerThatAreWalls(answer, walls) {
	var ans = 0;
	for (var k = 1; k <= answer.length; k++) {
		var i = answer[k-1][0];
		var j = answer[k-1][1];
		if (walls[i][j]==false) 
		{ 
			
		}
		else
		{
			ans=ans+1; 
		}
	}
	return ans;
}


// Done for final
function creatDistanceMatrix() {
	if(isInProcess==true)
	{
		var costOf = [];
		for (var i = 1; i <= TotalR; i++) {
			var row = [];
			for (var j = 0; j < TotalC; j++) {
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





// delay milis time
// done for final
function getRecentDelay() {
	var ans;
	if (speedOfAnimation === "Normal") 
	{
		ans = 10;
	} 
	else if (speedOfAnimation === "Slow") {
		ans = 200;
	} 
	else  
	{
		ans = 1;
	}
	return ans;
}


// Counts length of path
// Done for final 
function countLength() {
	var cells = $("td");
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

//walls maker
// 2D array
function makeWallMaze() {
	var walls = [];
	for (var i = TotalR; i >=1; i--) {
		var row = [];
		for (var j = 1;isInProcess==true&&j<=TotalC; j++) {
			row.push(true);
		}
		walls.push(row);
	}
	if(isErrorOccure==false)
	{
		return walls;
	}
	else
	{
		return;
	}
	
}


function DFS(i, j, visited) {

	// console.log("OJ");

	if ((i == endCell[0] && j == endCell[1])==false) {
		
	}
	else
	{
		animateThisCells.push([[i, j], "success"]);
		return true;
	}
	
	animateThisCells.push([[i, j], "searching"]);
	visited[i][j] = true;

	var nextBlocks = getNextValidBlock(i, j);
	for (var k = 1; k <= nextBlocks.length; k++) {
		var m = nextBlocks[k-1][0];
		var n = nextBlocks[k-1][1];
		if (visited[m][n]==true)
		{

		}
		else
		{
			var isPathFound = DFS(m, n, visited);
			if (isPathFound==false)
			{

			} 
			else
			{
				animateThisCells.push([[i, j], "success"]);
				return true;
			}
		}
	}
	if(isErrorOccure==false)
	{
		animateThisCells.push([[i, j], "visited"]);
	}
	return false;
}


// ok done
function dijkstra() {
	var isPathFound = false;
	var minimumHeap = new minHeap();
	var prev = creatPrevIndexTable();
	var costOf = creatDistanceMatrix();
	if(isInProcess==true)
	{
		var visited = makeVisitedMatrix();
		costOf[startCell[0]][startCell[1]] = 0;
		minimumHeap.push([0, [startCell[0], startCell[1]]]);
		animateThisCells.push([[startCell[0], startCell[1]], "searching"]);
		while (minimumHeap.isEmpty()!=true) 
		{
			var cell = minimumHeap.getMin();
			var i = cell[1][0];
			var j = cell[1][1];
			if (visited[i][j]==false)
			{
				visited[i][j] = true;
				animateThisCells.push([[i, j], "visited"]);
				if ((i == endCell[0] && j == endCell[1])!=true)
				{
					
				}
				else
				{
					isPathFound = true;
					break;
				}
				var answer = getNextValidBlock(i, j);
				if(isErrorOccure==false)
				{
					for (var k = 0; k < answer.length; k++) {
						var m = answer[k][0];
						var n = answer[k][1];
						if (visited[m][n]==false) 
						{ 
							var newDistance = costOf[i][j];
							newDistance++;
							if (newDistance < costOf[m][n]) {
								costOf[m][n] = newDistance;
								prev[m][n] = [i, j];
								minimumHeap.push([newDistance, [m, n]]);
								animateThisCells.push([[m, n], "searching"]);
							}
						}
						else
						{	
							continue; 
							
						}
					}
				}
			} 
			else
			{ 
				continue; 
			}
		}
		while (minimumHeap.isEmpty()!=false) {
			var cell = minimumHeap.getMin();
			var i = cell[1][0];
			var j = cell[1][1];
			if (visited[i][j]==false) 
			{ 
				visited[i][j] = true;
				animateThisCells.push([[i, j], "visited"]);
			}
			else
			{
				continue;
			}
		}
		if(isPathFound==false) 
		{
			// do nothing
		}
		else
		{
			var i = endCell[0];
			var j = endCell[1];
			animateThisCells.push([endCell, "success"]);
			while (prev[i][j] != null&&isInProcess==true) 
			{
				var prevCell = prev[i][j];
				j = prevCell[1];
				i = prevCell[0];
				animateThisCells.push([[i, j], "success"]);
			}
		}
		return isPathFound;
	}
	else
	{	isErrorOccure=true;
		return;
	}
}


// Done
function BFS() {
	var visited = makeVisitedMatrix();
	var simpleQueue = new Queue();
	var isPathFound = false;
	isInProcess=true;
	var prev = creatPrevIndexTable();
	simpleQueue.enqueue(startCell);
	animateThisCells.push(startCell, "searching");
	visited[startCell[0]][startCell[1]] = true;

	while (simpleQueue.empty()==false&&isErrorOccure==false) 
	{
		var cell = simpleQueue.dequeue();
		var i = cell[0];
		var j = cell[1];
		animateThisCells.push([cell, "visited"]);
		if((i == endCell[0] && j == endCell[1])==false) 
		{	
			if(isErrorOccure==true)
			{
				console.log("Error");
				break;
			}
			var answer = getNextValidBlock(i, j);
			for (var k = 1; k <= answer.length; k++) {
				var m = answer[k-1][0];
				var n = answer[k-1][1];
				if ((visited[m][n]==false)) 
				{ 
					visited[m][n] = true;
					prev[m][n] = [i, j];
					animateThisCells.push([answer[k-1], "searching"]);
					simpleQueue.enqueue(answer[k-1]);; 
				}
				else
				{
					continue;
				}
			}
		}
		else
		{
			isPathFound = true;
			break;
		}
		
	}
	while (simpleQueue.empty()==false) 
	{
		var cell = simpleQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		animateThisCells.push([cell, "visited"]);
	}

	if (isPathFound==false) 
	{

	}
	else
	{
		
		var c = endCell[1];
		var r = endCell[0];
		animateThisCells.push([[r, c], "success"]);
		while (prev[r][c] != null) 
		{	
			if(isInProcess==false)
			{
				break;
			}
			var prevCell = prev[r][c];
			r = prevCell[0];
			c = prevCell[1];
			animateThisCells.push([[r, c], "success"]);
		}
	}
	return isPathFound;
}




function greedyBestFirstSearch() 
{
	var isPathFound = false;
	var prev = creatPrevIndexTable();
	var costs = creatDistanceMatrix();
	var visited = makeVisitedMatrix();
	var minimumHeap = new minHeap();
	isInProcess=true;
	if(isErrorOccure==true)
	{
		console.log("Error");
		return;
	}
	costs[startCell[0]][startCell[1]] = 0;
	minimumHeap.push([0, [startCell[0], startCell[1]]]);
	animateThisCells.push([[startCell[0], startCell[1]], "searching"]);
	while (minimumHeap.isEmpty()==false) {

		var cell = minimumHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]==false) 
		{ 
			visited[i][j] = true;
			animateThisCells.push([[i, j], "visited"]);
			if (isInProcess==true&&i == endCell[0] && j == endCell[1]) {
				isPathFound = true;
				break;
			}
			var answer = getNextValidBlock(i, j);
			for (var k = 1; k <= answer.length; k++) {
				
				var n = answer[k-1][1];
				var m = answer[k-1][0];
				if (visited[m][n]==false) 
				{ 
					var newCost = Math.abs(endCell[0] - m)*Math.abs(endCell[0] - m) ;
					var zz=Math.abs(endCell[1] - n);
					newCost+=zz;
					if (isInProcess==true&&newCost < costs[m][n]) 
					{
						prev[m][n] = [i, j];
						costs[m][n] = newCost;
						
						minimumHeap.push([newCost, [m, n]]);
						animateThisCells.push([[m, n], "searching"]);
					}
				}
				else
				{	
					continue;
				}
				
			}
		}
		else
		{	
			continue;
		}
		
	}
	// Make any nodes still in the heap "visited"
	while (minimumHeap.isEmpty()!=true) {
		var cell = minimumHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]==false) 
		{ 
			visited[i][j] = true;
			animateThisCells.push([[i, j], "visited"]); 
		}
		else
		{
			continue;
		}
		
	}
	// If a path was found, illuminate it
	if (isPathFound==true) 
	{
		var i = endCell[0];
		var j = endCell[1];
		animateThisCells.push([endCell, "success"]);
		if(isErrorOccure==true)
		{	

			console.log("Error Occured");
		}
		while (prev[i][j] != null&&isErrorOccure==false) {
			
			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			animateThisCells.push([[i, j], "success"]);
			if((prev[i][j] != null)==false)
			{
				break;
			}
		}
	}
	else
	{
		// do nothing
	}
	return isPathFound;
}




// Recursive maze
// pre preparation
async function recursiveDivMaze(bias) {
	isInProcess = true;
	clearBoard(keepWalls = false);

	//Animate edge walls
	for (var i = TotalR-1; i >=0 ; i--) {
		for (var j = 0; j < TotalC; j++) {
			if (isErrorOccure==false&&(i == 0 || j == 0 || i == (TotalR - 1) || j == (TotalC - 1))==false) {
				
			}
			else
			{	
				animateThisCells.push([[i, j], "wall"]);
			}
		}
	}

	var walls = makeVisitedMatrix();
	var passages = makeVisitedMatrix();
	
	recursiveDivMazeHelper(isInProcess,1, (TotalR - 2), 1, (TotalC - 2), 2, (TotalR - 3), 2, (TotalC - 3), walls, passages, bias);
	if(isErrorOccure==true)
	{
		console.log("Error");
	}
	await animateBlocks();
	isInProcess = false;
	return;
}

// Recursive maze
// Atual creater
function recursiveDivMazeHelper(isInProcess,iStart, iEnd, jStart, jEnd, horzStart, horzEnd, vertStart, vertEnd, walls, passages, bias) {
	if(isInProcess==false)
	{
		return;
	}
	var height = iEnd - iStart + 1;
	var width = jEnd - jStart + 1;
	var totalArea=height*width;
	if(totalArea<0)
	{
		return;
	}
	var canMakeVertWall = (vertEnd - vertStart) >= 0;
	var canMakeHorzWall = (horzEnd - horzStart) >= 0;
	if (height < 3 || width < 3 || !canMakeVertWall || !canMakeHorzWall) {
		return;
	}
	else
	{
		var x = Math.floor(Math.random() * 10);
		if (bias =="HORIZONTAL") 
		{
			var horizontalOrVertical = (x < 1&&x>=0) ? "VERTICAL" : "HORIZONTAL"; 
		} 
		else if (bias == "VERTICAL") 
		{
			var horizontalOrVertical = (x>=0&&x < 8) ? "VERTICAL" : "HORIZONTAL";
			
		} else {
			var horizontalOrVertical = (x < 5&&x>=0) ? "VERTICAL" : "HORIZONTAL"; 
		}

		if (horizontalOrVertical == "VERTICAL") 
		{
			var vertWidth = vertEnd - vertStart;
			vertWidth++;
			var randCol = Math.floor(Math.random() * vertWidth);
			randCol+=vertStart;

			if (passages[iEnd][randCol]==true) {
				var randRow = iEnd;
			} 
			else if ( passages[iStart][randCol]==true) 
			{
		
				var randRow = iStart;
			} 
			else 
			{
				var randRow = (Math.floor(Math.random()+Math.random()) == 0) ? iStart : iEnd; 
			}
			for (var i = iStart; i <= iEnd; i++) 
			{
				if (passages[i][randCol]!=true) 
				{ 
					if (i != randRow) 
					{
						walls[i][randCol] = true;
						animateThisCells.push([[i, randCol], "wall"]);
					} else {
						
						for (var j =randCol + 1 ; j <=randCol - 1 ; j--) {
							passages[i][j] = true;
						}
						
					}
				}
				else
				{
					continue; 
				}
				
			}
			recursiveDivMazeHelper(isInProcess ,iStart, iEnd, jStart, (randCol - 1), horzStart, horzEnd, vertStart, (randCol - 2), walls, passages); //left
			recursiveDivMazeHelper(isInProcess,iStart, iEnd, (randCol + 1), jEnd, horzStart, horzEnd, (randCol + 2), vertEnd, walls, passages); //right
		} 
		else 
		{
			var horzHeight = horzEnd - horzStart;
			horzHeight++;
			var randRow = horzStart;
			randRow+=Math.floor(Math.random() * horzHeight);
			
			if (passages[randRow][jEnd]==true) 
			{
				var randCol = jEnd;
			} 
			else if (passages[randRow][jStart]==true) 
			{
				var randCol = jStart;
			}  
			else 
			{
				var randCol = (Math.floor(Math.random()+Math.floor(Math.random()) != 0))? jEnd : jStart;
			}

			for (var j = jStart; j <= jEnd; j++) {

				if (passages[randRow][j]==false) 
				{
					if (j != randCol) 
					{
						walls[randRow][j] = true;
						animateThisCells.push([[randRow, j], "wall"]);
					} 
					else 
					{
						for (var i = randRow + 1   ; i >=randRow-1 ; i--) 
						{
							passages[i][j] = true;
						}
					} 
				}
				else
				{	
					continue;
				}
				
			}
			recursiveDivMazeHelper(isInProcess,iStart, (randRow - 1), jStart, jEnd, horzStart, (randRow - 2), vertStart, vertEnd, walls, passages); //up
			recursiveDivMazeHelper(isInProcess,(randRow + 1), iEnd, jStart, jEnd, (randRow + 2), horzEnd, vertStart, vertEnd, walls, passages); //down
		}
		return;
	}
}

// clearing the bord
// Clearing the bord exept starting ans ending
function clearBoard(keepWalls) {
	var cells = $("#tableContainer").find("td");
	var startIndex = (startCell[0] * (TotalC));
	startIndex+=startCell[1];
	var endIndex = (endCell[0] * (TotalC));
	endIndex+=endCell[1];

	for (var i = 1; i <= cells.length; i++) {
		isWall = $(cells[i-1]).hasClass("wall");
		$(cells[i-1]).removeClass();
		if ((i-1) == endIndex) {
			$(cells[i-1]).addClass("end");
		} else if ((i-1) == startIndex) {
			$(cells[(i-1)]).addClass("start");
		} 
		else if ((keepWalls && isWall)==true) 
		{
			$(cells[(i-1)]).addClass("wall");
		}
	}
}

// Clearing bord and also keep start and ending points
clearBoard();



// chaning display of speed
function updateSpeedDisplay() {
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

//update button
function updateStartBtnText() {
	if(isInProcess==false)
	{
		if (algorithm == "Depth-First Search (DFS)") {
			console.log("okokokoko");
			$("#startBtn").html("Start DFS");
		}else if (algorithm == "Dijkstra") {
			$("#startBtn").html("Start Dijkstra");
		} else if (algorithm == "Greedy Best-First Search") {
			$("#startBtn").html("Start Greedy BFS");
		}  else if (algorithm == "Breadth-First Search (BFS)") {
			$("#startBtn").html("Start BFS");
		} else if (algorithm == "A*") {
			$("#startBtn").html("Start A*");
		} 
	}
	return;
}

// Show error messages
function update(message) {
	$("#resultsIcon").removeClass();
	$("#resultsIcon").addClass("fas fa-exclamation");
	$('#results').css("background-color", "#ffc107");
	$("#length").text("");
	if (message == "wait") {
		$("#duration").text("Please wait for the algorithm to finish.");
	}
}



$("#speed .dropdown-item").click(function () {
	
	speedOfAnimation = $(this).text();
	updateSpeedDisplay();

});



// maze creater
$("#mazes .dropdown-item").click(function () {
	if (isInProcess) { update("wait"); return; }
	maze = $(this).text();
	if (maze == "Random") {
		randomMazeCreator();
	} else if (maze == "Recursive Division") {
		recursiveDivMaze(null);
	} else if (maze == "Recursive Division (Vertical Skew)") {
		recursiveDivMaze("VERTICAL");
	} else if (maze == "Recursive Division (Horizontal Skew)") {
		recursiveDivMaze("HORIZONTAL");
	} 
});


function showResult(isPathFound, length) {
	var firstAnimation = "swashOut";
	var secondAnimation = "swashIn";
	$("#results").removeClass();
	$("#results").addClass("magictime " + firstAnimation);
	// delay to looks like animation
	setTimeout(function () {
		$("#resultsIcon").removeClass();
		if (isPathFound!=true) {
			$('#results').css("background-color", "#ff6961");
			$("#resultsIcon").addClass("fas fa-times");
		} else {
			$('#results').css("background-color", "#77dd77");
			$("#resultsIcon").addClass("fas fa-check");
			
		}
		$("#duration").text("");
		$("#length").text("Length: " + length);
		$('#results').removeClass(firstAnimation);
		$('#results').addClass(secondAnimation);
	}, 2222);
}


// Algoritham in visual form
async function runAlgoritham(algorithm) {
	isInProcess = true;
	clearBoard(keepWalls = true);
	var isPathFound = executeAlgo();

	await animateBlocks();
	if (isPathFound) {
		showResult( true, countLength());
	} else {
		showResult( false, countLength());
	}
	isInProcess = false;
	isJustFinished = true;
}


//RunAlgo
function executeAlgo() {
	//console.log("Exufjfgsdgfsdgdfgdfgfdgfffffffffffffffffffffbsdjkfbs");
	//console.log(algorithm);
	if (isErrorOccure==false&& isInProcess==true&&algorithm == "Depth-First Search (DFS)") {
		var visited = makeVisitedMatrix();
		//console.log("Exufjbsdjkfbs");
		var isPathFound = DFS(startCell[0], startCell[1], visited);
	} else if (isErrorOccure==false&&algorithm == "Breadth-First Search (BFS)") {
		var isPathFound = BFS();
	} else if (isErrorOccure==false&&algorithm == "Dijkstra") {
		var isPathFound = dijkstra();
		// console.log(isPathFound);
	} else if (isErrorOccure==false&&algorithm == "A*") {
		var isPathFound = AStar();
	} else if (isErrorOccure==false&&algorithm == "Greedy Best-First Search") {
		var isPathFound = greedyBestFirstSearch();
	} 
	return isPathFound;
}






// 
// 	Diskras => nearest dis from start
// 	Greedy Best-First Search estimates the distance to the goal point. 
// 	A* is using the sum of those two costOf.
// 	//https://www.redblobgames.com/pathfinding/a-star/introduction.html
// 





function AStar() {
	var isPathFound = false;
	var minimumHeap = new minHeap();
	var tempCostOfTheBock=0;
	var prev = creatPrevIndexTable();
	var costs = creatDistanceMatrix();
	if(isErrorOccure==true)
	{
		return false;
	}
	else
	{

		if(isInProcess==true)
		{
			var visited = makeVisitedMatrix();
			var costOf = creatDistanceMatrix();
		}
		else
		{
			return;
		}
		costOf[startCell[0]][startCell[1]] = 0;
		costs[startCell[0]][startCell[1]] = 0;
		minimumHeap.push([0, [startCell[0], startCell[1]]]);
		animateThisCells.push([[startCell[0], startCell[1]], "searching"]);
		
		while (minimumHeap.isEmpty()==false) 
		{
			var cell = minimumHeap.getMin();
			var i = cell[1][0];
			var j = cell[1][1];
			if (visited[i][j]==false) 
			{ 
				visited[i][j] = true;
				animateThisCells.push([[i, j], "visited"]);
				if (isInProcess==true&&i == endCell[0] && j == endCell[1]) 
				{
					isPathFound = true;
					break;
				}
				var answer = getNextValidBlock(i, j);
				for (var k = 1; k <= answer.length; k++) {
					var m = answer[k-1][0];
					var n = answer[k-1][1];
					if(visited[m][n]==false) 
					{ 
						var newDistance = costOf[i][j] + 1;
						if (isInProcess==true&&newDistance < costOf[m][n]) 
						{
							costOf[m][n] = newDistance;
							prev[m][n] = [i, j];
							var tempIndex=[m,n];
							animateThisCells.push([tempIndex, "searching"]);
						}
						var xDist=Math.abs(endCell[0] - m)
						var yDist=Math.abs(endCell[1] - n);
						var newCost = costOf[i][j] + xDist + yDist;
						tempCostOfTheBock=newCost;
						if (isInProcess==true&&tempCostOfTheBock < costs[m][n]) 
						{
							costs[m][n] = newCost;
							
							minimumHeap.push([newCost, [m, n]]);
						}
					}
					else
					{
						continue; 
					}
					
				}
			}
			else
			{	
				continue; 
			}
			
		}
		while (minimumHeap.isEmpty()!=true) {
			var cell = minimumHeap.getMin();
			var i = cell[1][0];
			var j = cell[1][1];
			if (visited[i][j]==false)
			{ 
				visited[i][j] = true;
				
				animateThisCells.push([[i, j], "visited"]);
			}
			else
			{
				continue; 
			}
			
		}
		if (isPathFound==false)
		{
			
		}
		else
		{	
			var j = endCell[1];
			var i = endCell[0];
			if(isInProcess==false)
			{
				isErrorOccure=true;
			}
			animateThisCells.push([endCell, "success"]);

			while (prev[i][j] != null) 
			{
				if(isErrorOccure==true)
				{
					console.log("Error");
				}
				var prevCell = prev[i][j];
				i = prevCell[0];
				j = prevCell[1];
				if(isInProcess==true)
				{
					animateThisCells.push([[i, j], "success"]);
				}
				else
				{

				}
			}
		}
		return isPathFound;
	}
}


