-- ghci :l module.hs
-- use let to define a name in ghci
-- :t expression view type signature 

-- these are functions
-- functions can be defined in any order
double2 x y = doubleMe x + doubleMe y
doubleMe x = x + x

-- an if statement is an expression (it always returns something)
-- 5 is also an expression (it always returns 5)
-- the if expression always requires the else
doubleSmall x = if x > 100
                then x 
                else x*2

-- ' can be used anywhere in function names
-- at the end of the name, it means a slight variation to the original
doubleSmall' x = (if x > 100 then x else x*2) + 1

-- a function without a parameter is a definition or name
-- definitions can't change after they've been defined
myName = "Matt"

-- lists are a homogenous data structure
-- strings are list comprehensions - list functions work on them

numbers = [1, 1, 2, 3, 5, 8, 13]
moreNumbers = [21, 34, 55, 89]

-- concat two lists (or strings)
combineLists a b = a ++ b
addTitle title name = title ++ " " ++ name

-- the ++ operator causes traversal of the left-hand list... why?
-- the cons operator : is 'isntantaneous'
-- [1, 2, 3] is equivalent to 1:2:3:[]
appendItem item list = item : list

getItemAtIndex index list = list !! index
