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
a = b // no semicolon will be inserted here. a = b(f()); is valid
(f());

a = b // a semicolon will be insertered here.
f(); 

// if a file starts with a vulnerable character
// ( [ + - /
// then prefix the file with a semicolon to avoid errors
// with script concatenation

// ! semicolons will be inserted after return if there is a newline


// strings: sequences of 16-bit code units
// unicode: every character has a value 0-1114111 (code point)
// unicode allows multiple binary encodings (UTF-8, UTF-16, UTF-32 etc)
