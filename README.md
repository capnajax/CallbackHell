# CallbackHell
A few notes on handling callbacks for new Node developers.

## Usage

To install
```
git clone https://github.com/capnajax/CallbackHell.git
cd CallbackHell
npm install
```
To run the lessons. View their source code to see what the lessons are doing.
```
node <lesson>.js
```

## Lessons


### [Lesson 0x01](0x01.js): Order of operations

JavaScript maintains a queue of asyncronous tasks. One common 
gotcha is that asynchronous tasks don't get called in the order
they appear in the code. If a task is asyncronous, it will be
executed when it comes to the head of the queue.

### [Lesson 0x02](0x02.js): Callback too early?

Many developers forget that in order to return a value, that 
value must be set before it is returned. If the value is set 
by a callback, you must ensure that return happens after the 
callback, not before.

### [Lesson 0x03](0x02.js): Async to the rescue

When handling a lot of callbacks, it helps to use a framework
like Async to manage them. This lesson provides a demo on how
to use Async to run operations in series and in parallel.

### [Lesson 0x04](0x02.js): Unwinding callback hell into async

When there is a long chain of callbacks, it is difficult
to trace the sequence of operations, see the entire outer
functions, and find the scope of variables. This shows how to
unwind a deeply nested function into an async series
