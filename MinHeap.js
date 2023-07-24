

export function minHeap() {
	this.heap = [];

	//isEmpty  function length is zero or not
	this.isEmpty = function () {
		if (this.heap.length != 0) {
			return false;
		}
		else if (this.heap.length == 0) {
			return true;
		}
	}

	//clear function --  clear the heap
	this.clear = function () {
		// clear this heap 
		this.heap = [];
		return;
	}

	//get the minimum element from heap
	this.getMin = function () {
		if (this.isEmpty() == true) {
			return null;
		}
		else {
			//In the min Heap the smallest element is stored at the first iNdex 
			var mini = this.heap[0];
			//when performing the pop operation , the last element of the heap is
			//removed and then stored at the first index to replace the root
			this.heap[0] = this.heap[this.heap.length - 1];
			this.heap[this.heap.length - 1] = mini;
			this.heap.pop();


			if (this.isEmpty() == true) {

			}
			else {
				//after removing the element to maintain the heap again well(properly) positioned 
				//we have to follow the siftDown() method  .
				this.siftDown(0);
			}
			return mini;
		}
	}


	//pushing the element in to the heap 
	this.push = function (item) {
		this.heap.push(item);
		this.siftUp(this.heap.length - 1);
		return;
	}


	//to find the children 
	this.children = function (index) {
		//left  child would be (2*index+1)
		//right child would be (2*index+2)
		return [(index + index) + 1, (index + index) + 2];
	}




	this.parent = function (index) {
		if (index == 0) {
			return null;
		}
		else if (index != 0) {
			return Math.floor((index - 1) / 2);
		}
	}


	this.siftDown = function (index) {

		//taking the leftChild,rightChild
		var children = this.children(index);


		var isLeftChildValid = (children[0] <= (this.heap.length - 1));
		var isRightChildValid = (children[1] <= (this.heap.length - 1));
		var newIndex = index;



		if (isLeftChildValid && this.heap[newIndex][0] > this.heap[children[0]][0]) {
			newIndex = children[0];
		}
		else {


		}



		if (isRightChildValid && this.heap[newIndex][0] > this.heap[children[1]][0]) {
			newIndex = children[1];
		}
		else {

		}


		if (newIndex === index) {
			return;
		}
		else {
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
		else {

		}
		return;
	}
    return {
        isEmpty: () => this.isEmpty(),
        clear: () => this.clear(),
        getMin: () => this.getMin(),
        push: (item) => this.push(item),
      };
}

