var _ = require('lodash');

/*
Lesson 0x01: order of operations

JavaScript maintains a queue of asyncronous tasks. One common 
gotcha is that asynchronous tasks don't get called in the order
they appear in the code. If a task is asyncronous, it will be
executed when it comes to the head of the queue.

this outputs:
-------------
starting
1
2
complete

*/

console.log ("starting");

// _.deferred(cb) runs the cb function at some later point 
// in time. Internally the cb is thrown onto a queue. Once
// the current task is complete, node will run the cb() 
// function.

_.defer(function cb() {

	console.log("2");
	console.log("complete");

});

// even though the console.log("2") appears earlier in the
// code listing, the console.log("1") runs first.

console.log("1");

