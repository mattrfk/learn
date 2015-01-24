// notes from Effective Javascriipt by David Herman
console.log("hello");

(function(){ // this is an immediately invoked function expression (IIFE)
    function f(x) {
        // turn on strict mode
        // a string literal will do nothing on engines that do not support strict mode
        "use strict"; 
        // var arguments = []; // error: redefinition of arguments
    }
})(); // end of immediately invoked function expression

// all numbers are double-precision floats (64bit)
typeof 17; // "number"
typeof 98.6; // "number"
typeof -2.3; // "number"

// bitewise operations implicitely converts to 32 bits
// performs operation
// converts back to standard 64bit float
8 | 1;

console.log('0.1 + 0.2 = ' + (0.1 + 0.2)); //0.300000000000004 ... wtf?
// side note: irb, python3 and ghci all produce the same thing...
// avoid this by scaling up to to integers

// the type coercion is strong
3 + true; // 4

// - * / % will attempt to convert to numbers
// + will convert to numbers, unless there's a string involved

1 + 2 + '3'; // '33'
1 + '2' + 3; // '123'

'8' | '1' == 8 | 1 == 9


// null will convert to 0

var x = NaN;
x === NaN; // false (this is IEEE standard... wtf IEEE)
NaN === NaN; // false

isNaN(NaN); // true
isNaN("foo"); //true - attempts to coerce "foo" to a number...
isNaN(undefined); //true
isNaN({}); //true

// best way to check if a number is NaN is to compare it to itself:
// Reasoning by IEE for NaN != Nan:
// 1. x == y should be equivalent to x - y == 0 whenever possible
// 2. isnan() was not universally available at the time, but they
// wanted to provide an efficient way of checking for NaN
function myIsNaN(a) {
    return a !== a;
}

// methods used for type coercion
Math.valueOf = function() { return 42; };
Math.toString = function() { return "muahaha" };
Math + 6; // 48
"hi" + Math; // "hi42" ...... WTF it still calls valueOf THEN converts to a string

// moral of the story: only use valueOf for objects that are meant
// to be represented as number


// There are 7 falsy values in javascript:
// false 0 -1 "" NaN null undefined
// Everything else is truthy

if (typeof x === "undefined"); // is the standard way to check for undefined
if (x === undefined); // this works too, but will return error if undeclared

// five primative types:
// boolean number string null undefined

var s = new String("hello"); // a string object wraps a string value
typeof "hello"; // "string"
typeof s; // "object"


var s1 = new String("hello");
var s2 = new String("hello");

s1 == s2; // false
s1 === s2; //false ... wtf.js

"hello".toUpperCase(); // HELLO - this implicitly wraps "hello" in a String object
// the implicit wrapping produces a new String object each time it happens
"hello".someProperty = 1;
"hello".someProperty; // undefined

// the == operator does implicit coercion
1 == true; // true (type converting comparison)
1 === true; // false (strict equality)

var n = "123"
console.log(+n); // explicit conversion with unary +

// semicolons are only ever inserted:
// 1. before a }
// 2. after one or more newlines
// 3. at the end of the program input
function area(r) {r = +r; return Math.PI * r * r } // a required semicolon

// semicolons are only inserted when the next input token cannot be parsed
// a = b // no semicolon will be inserted here. a = b(f()); is valid
// (area());

// a = b // a semicolon will be insertered here.
// area(); 

// if a file starts with a vulnerable character
// ( [ + - /
// then prefix the file with a semicolon to avoid errors
// with script concatenation

// ! semicolons will be inserted after return if there is a newline


// strings: sequences of 16-bit code units
// unicode: every character has a value 0-1114111 (code point)
// unicode allows multiple binary encodings (UTF-8, UTF-16, UTF-32 etc)


/****************************************
* Chapter 2 - Variable Scope
****************************************/
var a = 10; // global

function thing(i) {
    var b; // not global
    var a = 3; // global a is not accessible anymore
    console.log(a); // 3
}

thing(1);

console.log(a); // 10


this // is the global object
// in browsers, this is bound to global window variable
// adding a global variable updates the global object automagically

var x = 3;
x = 7;
console.log(this);
this.x = 100;
console.log(this);
// this doesn't appear to be the global object
console.log("modified from this " + x); // x should be 100? I'm confused..
// answer: this references node's module object, not a global object

// use global object for feature detection

function swap() {
    a = 3; // unboound variable = global
    var b = 2; // local variabl
}

// with is unsafe and hard to optimize. Avoid it

// You can access variables declared outside of the current function
//      lexical scope
// Functions can access variables declared in outer functions
// after those variables have returned.
function greetingBuilder(greeting, exclamation) {

    // this is a closure, becaues it refers to external variables
    // greeting and exclamation
    // it stores a reference to outer variables, and can even update them!
    function buildGreeting( name  ) {
        return greeting + " " + name + exclamation;
    }
    return buildGreeting; // return an inner function, to be called later
    // function values internally store any variables they need
    // to access from their containing scopes.
    // this is called a closure
}

// 2 distinct functions are created from the same definition
var f = greetingBuilder("hello", "!!!!!");
var f2 = greetingBuilder("howdy", "?");

var g1 = f("matt");
var g2 = f2("matt");
console.log(g1);
console.log(g2);

// same as above, but using a function expression
function greetingBuilder(greeting, exclamation) {
    // this is a function expression
    // this function expression is anonymouse but they can have names
    return function buildGreeting( name  ) {
        return greeting + " " + name + exclamation;
    }
}

function box() {
    var val = undefined;

    //return an object containing 3 closures
    return {
        set: function(newVal) { val = newVal; },
        get: function() { return val; },
        type: function() { return typeof val; }
    }
}

var b = new box();
// accessing variable within outer scope (the box object)
b.set("hello"); // set has its own reference to val
console.log("my box contains a " + b.type() + " with value " + b.get());

// javascript has lexical/static scoping
// except the scope is defined by the function, not any block

// when a variable is declared, it is 'hoisted' to the top of its scope

// this function....
function a() {
    for(var i = 0; i < 10; i++){
        console.log(i);
    }
    
    for(var i = 0; i < 10; i++){
        console.log(i-10);
    }
}

// gets hoisted into this version
// this happens before any code is executed
function b() {
    var i = 0;
    for(i = 0; i < 10; i++)
        console.log(i-10);
    }
    for(i = 0; i < 10; i++){
        console.log(i-10);
    }
}

// mdn recommends declaring variables at the top of their scope.
// a counterargument to this is that code is written for developers first,
// computers second.
