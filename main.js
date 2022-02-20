import GuessTheNumber from "./GuessTheNumber.js";

const CLICK = "click";

	/*
		1. For the following constants, we need to fetch
		their corresponding HTML elements. By pure
		coincidence, the names of these constants
		matches the ID of the HTML elements. Makes it
		easier ;)
	*/

const [
	lowerBound,
	upperBound,
	guessesLeft,
	guessInput,
	guessButton,
	helpButton,
] = [
	"lowerBound",
	"upperBound",
	"guessesLeft",
	"guessInput",
	"guessButton",
	"helpButton",
].map(id => document.getElementById(id));

	/*	this takes an array of ids,
		and maps them to a new array
		converting them to HTML elements as strings
	*/

const game = new GuessTheNumber();
	
	/*
		This creates a "Guess The Number" game using the keyword "new".
	*/
	
	/*
		3. Display the lower and upper bound to the user. We
		do this by using our lowerBound and upperBound
		elements above and use their `innerHTML` property to
		assign a new text/string value inside each of these
		`<span>` tags. Be sure to look this up on MDN or
		otherwise. (hint: game.lower and game.upper)
	*/

lowerBound.textContent = game.lower;
upperBound.textContent = game.upper;
	
	/*
		textContent limits inputtable values to only text
		stops 3rd parties inserting malicious scripts etc
		innerHTML doesn't do this

	/*
		4. Next, do something very similar but for our attempts
		remaining. Our `game` object has a attemptsRemaining
		method. Call this method and assign the value returned
		to the innerHTML property of our guessesLeft span element.
	*/

guessesLeft.textContent = game.attemptsRemaining();
	
	/*
		5. Add a click event listener to our help button. On click, call
		the `game.help()` method and, based on the value returned,
		ALERT to the user that their last guess was within 10 or 20
		or whatever from the target answer.
	*/

helpButton.addEventListener(
		CLICK, event => {
			event.preventDefault();

			const distance = game.help();
	/*
		this gives game.help a const value so you don't have
		to type it out every time
	*/

			alert (
				distance === 0 ?
				"You need to make a vaild guess first" :
				`Your last guess was within ${ distance } of the right answer.`
			);
		}
);

	/*
		6. Finally, add a click listener to our guess button. Inside the
		callback function, we need to fetch the value (almost as if it
		is also the name of a property on our guessInput) of our guess
		input field and then pass that value to `game.guess`. Be sure to
		ensure the value is COERCED into a number from a string. Next,
		ALERT the user if the guess was too high, too low, etc etc.
		Lastly, call `game.attemptsRemaining` and assign that new value
		to our guessesLeft span element by using `innerHTML`.
	*/

guessButton.addEventListener(
		CLICK, event => {
			event.preventDefault();

		const state = game.guess(parseInt(guessInput.value));

		const {
			TOO_HIGH,
			TOO_LOW,
			EXACT_MATCH,
			OUT_OF_BOUNDS,
			GAME_OVER
		} = GuessTheNumber;


	/*
		game.guess finds the guessInput value and
		parseInt prevents non-integers being returned -
		this is given the const name "state"
	*/
		if (state === TOO_HIGH)
			alert(`That guess was too high. Please choose a lower number.`);

		else if (state === TOO_LOW)
			alert(`That guess was too low. Please choose a higher number.`);

		else if (state === EXACT_MATCH) {
			alert(`That guess is exactly right. You have won the game. Press OK to play again`);
			location.reload();
		}

		else if (state === OUT_OF_BOUNDS)
			alert(`That guess was out of bounds. Please choose a number between ${ game.lower } and ${ game.upper }.`);

		// else if (state === REPEATED_NUMBER)
		// 	alert(`You've already guessed that number. Please choose a different number.`);

		else if (state === GAME_OVER) {
			alert(`You have no guess left. The game is over.`);
			location.reload();
		}

		guessesLeft.innerHTML = game.attemptsRemaining();
		guessInput.value = ``;
});