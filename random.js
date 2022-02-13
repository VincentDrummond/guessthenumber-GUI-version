/*

	This file is straight-forward. Be sure you still understand
	what is happening here. Even though we export both, we will
	only be importing ONE of these functions into our `main.js`.

*/
export const randomNumber = (a = 0, b = 1) =>
								Math.random() * (b - a) + a;

export const randomInteger = (a, b) =>
								Math.round(randomNumber(a, b));