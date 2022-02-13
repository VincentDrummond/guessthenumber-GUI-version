import GuessTheNumber from "./GuessTheNumber.js";

const CLICK = "click";

/*

	1. For the following constants, we need to fetch
	   their corresponding HTML elements. By pure
	   coincidence, the names of these constants
	   matches the ID of the HTML elements. Makes it
	   easier ;)

	   (hint: use a method on the document object)
*/
const lowerBound = document.getElementById("lowerBound");
const upperBound = document.getElementById("upperBound");

const guessesLeft = document.getElementById("guessesLeft");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");

const helpButton = document.getElementById("helpButton");

/*

	2. Create a guess the number game using the keyword
	   "new". Use either the default settings, or pass
	   in your own. We won't worry about concepts like
	   EASY, MEDIUM, or HARD just yet.
 
*/
const game = new GuessTheNumber();
/*

	3. Display the lower and upper bound to the user. We
	   do this by using our lowerBound and upperBound
	   elements above and use their `innerHTML` property to
	   assign a new text/string value inside each of these
	   `<span>` tags. Be sure to look this up on MDN or
	   otherwise. (hint: game.lower and game.upper)

*/
lowerBound.innerHTML = game.lower;
upperBound.innerHTML = game.upper;
/*

	4. Next, do something very similar but for our attempts
	   remaining. Our `game` object has a attemptsRemaining
	   method. Call this method and assign the value returned
	   to the innerHTML property of our guessesLeft span element.

*/
guessesLeft.innerHTML = game.attemptsRemaining();
/*

	5. Add a click event listener to our help button. On click, call
	   the `game.help()` method and, based on the value returned,
	   ALERT to the user that their last guess was within 10 or 20
	   or whatever from the target answer.

*/
helpButton.addEventListener(CLICK,
				alert(`Your guess is within ${ game.help() }`));
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

guessButton.addEventListener(CLICK, alert(`${ game.guess(Number(guessInput.value)) }`),
		guessesLeft.innerHTML = game.attemptsRemaining()

);

// SIDE NOTE: when you click these buttons, does something weird happen?
// If so, might we need to prevent some sort of default behaviour? Perhaps?
// Maybe? Quite possibly??? Hmmm....

// That's all folks! Good luck!!