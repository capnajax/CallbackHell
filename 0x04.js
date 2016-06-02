
var _ = require('lodash');
var async = require('async');

// How to use async to sort out deeply nested callbacks

function randomDelay(someString, cb) {
	var delay = Math.floor(Math.random()*1000);
	setTimeout(
			function() {
				cb(null, someString.toUpperCase());
			}, 
			delay
		);
}

console.log();

// this series call is necessary to ensure that the tutorial will run in order.
async.series([

	// Frequently, node code can start to look like this
	// function below. Callbacks are deeply nested inside
	// of callbacks, pushing code farther and farther to
	// the right. This is sometimes pejoratively called 
	// "Callback Hell".

	function(nestedDone) {

		console.log('\nCallback Hell example\n')

		console.log("function 1");
		randomDelay("some string 1", function(err, someResponse) {

			console.log(someResponse);

			console.log("nested function 2");
			randomDelay("some string 2", function(err, someResponse) {

				console.log(someResponse);

				console.log("nested function 3");
				randomDelay("some string 3", function(err, someResponse) {

					console.log(someResponse);

					console.log("nested function 4");
					randomDelay("some string 4", function(err, someResponse) {

						console.log(someResponse);

						nestedDone();

					});

				});

			});

		});
	},

	// it gets difficult to trace the sequence of 
	// operations, the entire outer functions, and 
	// the scope of variables, especially if the 
	// nested functions are even moderately complex.

	// here's another way to lay out the same code

	function(asyncDone) {

		console.log('\nCallback Hell unwound\n')

		async.series([

			function(done) {

				console.log("series function 1");
				randomDelay("some string 1", function(err, someResponse) {
					console.log(someResponse);
					done();
				});

			},

			function(done) {

				console.log("series function 2");
				randomDelay("some string 2", function(err, someResponse) {
					console.log(someResponse);
					done();
				});

			},

			function(done) {

				console.log("series function 3");
				randomDelay("some string 3", function(err, someResponse) {
					console.log(someResponse);
					done();
				});

			},

			function(done) {

				console.log("series function 4");
				randomDelay("some string 4", function(err, someResponse) {
					console.log(someResponse);
					done();
				});

			},


		], asyncDone)

	},


]);


