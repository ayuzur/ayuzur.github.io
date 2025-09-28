document.title = "ayuzur";

import {
	charToScreen,
	CharObj,
	str_to_char_objs,
	draw_char_objs,
	update_char_objs,
	reset_char_objs,
	letters_count_to_pixels,
} from "./mod/minter.js";

import {
	dist,
	vect,
	magnitude,
	normalize,
	vec_mult,
} from "./mod/utils.js";

import {
	canvas,
	ctx,
} from "./mod/canvas.js";

const clear_screen = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

var str = "I am ayuzur";
var x = canvas.width / 2 - letters_count_to_pixels(str.length / 2);
var y = canvas.height / 2 - letters_count_to_pixels(2);
var chobs = [];
str_to_char_objs(chobs, str, x, y, canvas.width - x - 6);

str = "https://github.com/ayuzur"
x = canvas.width / 2 - letters_count_to_pixels(str.length / 2);
y = canvas.height / 2 + letters_count_to_pixels(2);
str_to_char_objs(chobs, str, x, y, canvas.width - x - 6);

/*
str = "made entirely with html canvas and vanilla js"
x = canvas.width / 2 - letters_count_to_pixels(str.length / 2);
y = canvas.height - letters_count_to_pixels(2);
str_to_char_objs(chobs, str, x, y, canvas.width - x - 6);
*/

console.log(chobs);

document.addEventListener("mousemove", function(e) {
	var DOMrect = canvas.getBoundingClientRect();
	var rectx = e.clientX - DOMrect.left;
	var recty = e.clientY - DOMrect.top;
	rectx = canvas.width * (rectx / DOMrect.width);
	recty = canvas.height * (recty / DOMrect.height);
	var m = {
		x: rectx,
		y: recty,
	};
	for (var i = 0; i < chobs.length; i++) {
		var chob = chobs[i];
		const radius = 30
		if (dist(chob, m) <= radius) {	
			const vec = vect(m, chob);
			const mag = magnitude(vec);
			normalize(vec);
			const push = radius - mag;
			vec_mult(vec, push);
			chob.vx += vec.x;
			chob.vy += vec.y;
		}
	}
});

document.addEventListener("mousedown", function(e) {
	mousedown = true;
});
document.addEventListener("mouseup", function(e) {
	mousedown = false;
});

var last = 0;
var delta = 0;
var mousedown = false;
const frame = (tfs) => {
	clear_screen();
	delta = tfs - last;
	delta /= 1000;
	last = tfs;
	if (mousedown) {
		reset_char_objs(chobs, delta);
	}
	update_char_objs(canvas, chobs, delta);
	draw_char_objs(ctx, chobs);
	window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);
