
var _ = require('lodash');
var async = require('async');

// demonstrates using async to manage callbacks
// https://github.com/caolan/async

function randomDelay(cb) {
	var delay = Math.floor(Math.random()*1000);
	setTimeout(cb, delay);
}

console.log();

// this series call is necessary to ensure that the tutorial will run in order.
async.series([
	function(sdone) {

		console.log("Demonstrate running asynchronous tasks sequentially");

		// this demonstrates async.series. Its purpose is 
		// to ensure a task doesn't begin until the task
		// before it is complete.
		// In the output, you'll notice that each method
		// Is started in order, and completes before the
		// next method starts.
		async.series(
			[	function(done) {
					console.log("starting series - 1");
					randomDelay(function() {console.log("completed series - 1"); done();});
				},
				function(done) {
					console.log("starting series - 2");
					randomDelay(function() {console.log("completed series - 2"); done();});
				},
				function(done) {
					console.log("starting series - 2");
					randomDelay(function() {console.log("completed series - 3"); done();});
				},
			],
			function seriesComplete() {
				console.log("series complete");
				console.log();
				sdone();
			}
		);

	},

	function(pdone) {

		console.log("Demonstrate running asynchronous tasks in parallel");

		// this demonstrates async.parallel. Its purpose is 
		// to allow a set of tasks to run in parallel, but
		// wait for all of the tasks to complete before 
		// calling the `parallelComplete` callback.
		// In the output, you'll notice that each method
		// is started in order, but they complete in a
		// random order. However all of these functions
		// complete before the `parallelComplete` callback
		// is called.
		async.parallel(
			[	function(done) {
					console.log("starting parallel - 1");
					randomDelay(function() {console.log("completed parallel - 1"); done();});
				},
				function(done) {
					console.log("starting parallel - 2");
					randomDelay(function() {console.log("completed parallel - 2"); done();});
				},
				function(done) {
					console.log("starting parallel - 3");
					randomDelay(function() {console.log("completed parallel - 3"); done();});
				},
			],
			function parallelComplete() {
				console.log("parallel complete");
				console.log();
				pdone();
			}
		);

	},


	function(sdone) {

		console.log("Demonstrate an error condition running asynchronous tasks sequentially");

		// this demonstrates an error condition. If there
		// is a problem, call the done method with the
		// error message, and the series will abort.
		// In the output, you'll notice that there are 
		// three functions, but only the first one is 
		// called. The remainder will not call because 
		// the done() function was called with an error
		// message.
		async.series(
			[	function(done) {
					console.log("starting series - 1");
					randomDelay(function() {console.log("completed series - 1"); done('error as expected. aborting.');});
				},
				function(done) {
					console.log("starting series - 2");
					randomDelay(function() {console.log("completed series - 2"); done();});
				},
				function(done) {
					console.log("starting series - 2");
					randomDelay(function() {console.log("completed series - 3"); done();});
				},
			],
			function seriesComplete(err) {
				console.log("series complete");
				console.log(err||'');
				console.log();
				sdone();
			}
		);

	},


	// in parallel, errors work the same way, except that
	// because these functions are running in parallel, it
	// is possible that other functions have already
	// started running before the error was found. In this
	// output, not that there MAY BE 
	// "completed parallel - n" messages after the 
	// "parallel complete" message. 
	function(pdone) {

		console.log("Demonstrate an error condition running asynchronous tasks in parallel");

		async.parallel(
			[	function(done) {
					console.log("starting parallel - 1");
					randomDelay(function() {console.log("completed parallel - 1"); done('error as expected. aborting.');});
				},
				function(done) {
					console.log("starting parallel - 2");
					randomDelay(function() {console.log("completed parallel - 2"); done();});
				},
				function(done) {
					console.log("starting parallel - 3");
					randomDelay(function() {console.log("completed parallel - 3"); done();});
				},
			],
			function parallelComplete(err) {
				console.log("parallel complete");
				console.log(err||'');
				pdone();
			}
		);

	},

	// this is just a delay to ensure the output with 
	// the previous demonstration doesn't migle with 
	// the output of this one.
	function(delayDone) {
		setTimeout(function() {console.log(), delayDone();}, 1100);
	},

	function(sdone) {

		console.log("Demonstrate iterating over a data set sequentially");

		// it is possible to iterate over an array of data
		// with an asynchronous function. The `eachSeries`
		// method ensures that the method on the (n+1)th 
		// element does not begin until the method has
		// completed on the nth element.
		async.eachSeries(['1', '2', '3'],
			function(item, done) {
				console.log("starting series - " + item);
				randomDelay(function() {console.log("completed series - " + item); done();});
			},
			function seriesComplete(err) {
				console.log("series complete");
				console.log();
				sdone();
			}
		);

	},

	function(pdone) {

		console.log("Demonstrate iterating over a data set in parallel");

		// To iterate over the data, but allow the 
		// iterations to operate in parallel, call
		// the `each` method.

		async.each(['1', '2', '3'],
			function(item, done) {
					console.log("starting parallel - " + item);
					randomDelay(function() {console.log("completed parallel - " + item); done();});
				},
			function parallelComplete(err) {
				console.log("parallel complete");
				console.log();
				pdone();
			}
		);

	},


]);


