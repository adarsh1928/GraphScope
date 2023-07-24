


export function Queue() {
	this.stack = new Array();

	//remove element from the top of 
	this.dequeue = function () {
		return this.stack.pop();
	}

	//adding a element to the top of the stack
	this.enqueue = function (item) {
		this.stack.unshift(item);
		return;
	}
	//isEmpty() function in Queue
	this.empty = function () {
		if (this.stack.length != 0) {
			return false;
		}
		else {
			return true;
		}
	}

	//clear function to start from very begining
	this.clear = function () {
		this.stack = new Array();
		return;
	}
}