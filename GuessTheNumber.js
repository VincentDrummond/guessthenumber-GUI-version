import { randomInteger } from "./random.js";

/*

	What's this?? a CLASS? What does this do?

	You'll notice A LOT is similar to our homework
	from the other week. For that homework, there
	was a function named GuessTheNumber which return
	a game object for us based on passed settings.
	Classes do this for us in a much cleaner and more
	easily read/understood manner.

*/
export default class GuessTheNumber {
	/*

		MORE OF THESE SYMBOLS!! AHHHH!!! SCARY!!

		Nah, not that scary. What's important is
		this is READABLE. Symbol are values that
		are meant to express concepts.

		Also, you might notice these properties are
		STATIC. This means they are attached to the
		class/type GuessTheNumber, and not on the
		object/instance returned by this class when
		called with the `new` keyword.

	*/
	static TOO_LOW = Symbol('too low');
	static TOO_HIGH = Symbol('too high');
	static EXACT_MATCH = Symbol('exact match');
	static OUT_OF_BOUNDS = Symbol('out of bounds');
	static GAME_OVER = Symbol('game over');
	// static REPEATED_NUMBER = Symbol('repeated number');


	/*
	
		These properties should look super familiar!
		Unlike the STATIC properties above, these will
		be attached an instance of GuessTheNumber when
		we call this class with the `new` keyword.

	*/
	lower;
	upper;
	target;

	maxTries;
	attempts = [];

	/*
	
		If we were to do the following:

			const game = new GuessTheNumber();

		This constructor method is what is used to
		"setup" our object/instance returned.
		Here, we assign default values and randomly
		generate a number in our given range.
	
	*/
	constructor(settings = {}) {
		const {
			lower = 1,
			upper = 100,
			tries:maxTries = 10,
		} = settings;

		/*
		
			We could do:

			this.lower = lower;
			this.upper = upper;
			this.maxTries = maxTries;

			etc...

			but Object.assign makes this easier for us.
			Look it up on MDN! The less typing the better!

		*/
		Object.assign(this, {
			lower,
			upper,
			maxTries,
			target: randomInteger(lower, upper),
		});
	}

	/*
		We create methods just as we did before.
		Here, you can see we are using our STATIC
		properties as values to be returned based
		on what our guess is :)
	*/
	guess(num = 1) {
		/*
			This method should look very familiar!
			This time though, instead of doing the
			console.log stuff within here, we simply
			return the current STATE of the game after
			our guess (have we won? Did we guess too
			high? etc.) We will handle the user
			presentation in main.js
		*/
		this.attempts.push(num);

		if (this.attempts.length === this.maxTries)
			return GuessTheNumber.GAME_OVER;

		if (num === this.target)
			return GuessTheNumber.EXACT_MATCH;

		if (num < this.lower || num > this.upper)
			return GuessTheNumber.OUT_OF_BOUNDS;

		if (num < this.target)
			return GuessTheNumber.TOO_LOW;
		
		if (num > this.target)
			return GuessTheNumber.TOO_HIGH;

		// if (num === XXX)
		// 	return GuessTheNumber.REPEATED_NUMBER;
	}


	/*
		This method returns multiples of 10 to indicate
		the range our last guess is within to our target.
		If the value returned is 0, this means the user
		hasn't made any valid guesses yet.
	*/
	help() {
		const lastGuess = this.attempts.at(-1);
		
		if (isNaN(lastGuess))
			return 0;
		
		return Math.ceil(Math.abs(this.target - lastGuess) / 10) * 10;
	}


	/*
	
		Use this handy function to get how many tries our
		user has left.
	
	*/
	attemptsRemaining() {
		return this.maxTries - this.attempts.length;
	}
}