var _ = require('lodash');

/*
Lesson 0x02: orders of operations and callbacks

Many developers forget that in order to return a value, that 
value must be set before it is returned. If the value is set 
by a callback, you must ensure that return happens after the 
callback, not before.

this outputs:
-------------
starting
undefined
This is a dataItem

*/

function callMe(cb1, cb2) {

	var dataItem

	_.defer(function() {
		dataItem = "This is a dataItem"
		cb1(dataItem); // prints out "this is a dataItem"
	});

	cb2(dataItem); // prints out "undefined"

}

function callMeCB(val) {
	console.log(val);
} 

console.log ("starting");

// calls the callMe function with the same callback twice. 
// However, the first time, it returns "undefined", and the 
// second time it returns "This is a dataItem".
callMe(callMeCB, callMeCB);

