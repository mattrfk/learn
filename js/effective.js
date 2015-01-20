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
x === NaN; //false (this is IEEE standard... wtf IEEE)

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

Math.valueOf = function() { return 42; };
Math.toString = function() { return "muahaha" };
Math + 6; // 48
"hi" + Math; // "hi42" ...... WTF it still calls valueOf THEN converts to a string
