#! /usr/bin/env ruby

class MegaGreeter 
	# define a function h
	# default value for parameter name is "World"
	def initialize(names = "World")
		# create an instance variable
		# name is a private variable
		@names = names
	end

	def say_hi
		if @names.nil?
			puts "..."
		elsif @names.respond_to?("each") # is it a list?
			# @names is a list, we can iterate
			# the do method takes a lambda (anonymous function, also an object 
			# like everything else). |params| to lambda
			@names.each do |name|
				puts "Hello #{name}!"
			end
		else
			puts "Hello #{@names}!"
		end
	end

	def say_bye
		if @names.nil?
			puts "..."
		elsif @names.respond_to?("join")
			# Join the list of elements with commas
			# duck typing: I just care if it behaves like a list
			puts "Goodbye #{@names.join(", ")}. Come back soon!"
		else
			puts "Goodbye #{@names}. Come back soon!"
		end
	end
end

# You can 'open up' and alter a ruby class any time
class MegaGreeter
	# creates name and name= methods
	attr_accessor :names
end

#create a new greeter object
# g = Greeter.new "matt"

# g.say_hi
# g.say_bye() # parens are options (even with params)

# __FILE__ contains the name of the current file
# $0 is the name of the file that started the program
if __FILE__ == $0
	mg = MegaGreeter.new
	mg.say_hi
	mg.say_bye

	# change name 
	mg.names = "Zeke"
	mg.say_hi
	mg.say_bye

	# change to array
	mg.names = ["Albert", "Brenda", "foo", "bar"]
	mg.say_hi
	mg.say_bye

	# change to nil
	mg.names = nil
	mg.say_hi
	mg.say_bye
end
