import {
	vect,
	magnitude,
} from "./utils.js";

// sets up spritesheet

const textSpriteSheet = new Image();
textSpriteSheet.src = "img/textSpriteSheet.png";

const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2",
"3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*",
"(", ")", "-", "+", "_", "=", "{", "}", "[", "]", "|", "\\", ":", ";", "\"",
"'", "<", ">", ".", ",", "/", "?", "~", "\`"];

export const charToScreen = (ctx, key, x, y) => {	
	const index = characters.indexOf(key);

	const img_rel_x = (index % 26) * 6;
	const img_rel_y = Math.floor(index / 26) * 6;
	const height = 6;
	const width = 5;
	if (index != -1) {
		ctx.drawImage(
			textSpriteSheet,
			img_rel_x,
			img_rel_y,
			height,
			width,
			x,
			y,
			height,
			width
		);	
	}

}

export function CharObj(ch, x, y) {
	this.x = x;
	this.y = y;
	this.ch = ch;
	this.vx = 0;
	this.vy = 0;
	this.ox = x;
	this.oy = y;
	this.a = 20;
}

export const str_to_char_objs = (charObjs, str, x, y, pw) => {
	var x_shift = 0;
	var y_shift = 0;
	for (var i = 0; i < str.length; i++) {
		if (str[i] == '\n') {
			x_shift = 0;
			y_shift += letters_count_to_pixels(1);
			continue;
		}
		var ch = new CharObj(str[i].toLowerCase(), x + x_shift, y + y_shift);
		x_shift += letters_count_to_pixels(1);
		if (x_shift > pw) {
			x_shift = 0;
			y_shift += letters_count_to_pixels(1);
		}
		charObjs.push(ch);
	}
}

export const draw_char_objs = (ctx, array) => {
	for (var i = 0; i < array.length; i++) {
		var chob = array[i];
		charToScreen(ctx, chob.ch, Math.floor(chob.x), Math.floor(chob.y));
	}
}

const reset_char_obj = (chob, delta) => {
	if (chob.vx != 0) {
		chob.vx = 0;
	}
	if (chob.vy != 0) {
		chob.vy = 0;
	}

	if (chob.x != chob.ox || chob.y != chob.oy) {
		const og = {x: chob.ox, y: chob.oy};
		const vec = vect(chob, og);
		const mag = magnitude(vec);
		if (!(mag < 0.5)) {
			const factor = 20;
			chob.x += vec.x / factor;
			chob.y += vec.y / factor;
		}
		else if (mag > 0) {
			chob.x = chob.ox;
			chob.y = chob.oy;
		}
	}
}

export const reset_char_objs = (array, delta) => {
	for (var i = 0; i < array.length; i++) {
		var chob = array[i];
		reset_char_obj(chob, delta);
	}
}

export const update_char_objs = (canvas, array, delta) => {	
	for (var i = 0; i < array.length; i++) {
		var chob = array[i];
		//console.log(chob);
		if (chob.vx == 0 && chob.vy == 0) {
			reset_char_obj(chob, delta);
			continue;
		}

		if (chob.x < 0 || chob.x > canvas.width) {
			chob.vx *= -1
		}

		if (chob.y < 0 || chob.y > canvas.height) {
			chob.vy *= -1;
		}

		chob.x += chob.vx * delta;
		chob.y += chob.vy * delta;

		const pvx = chob.vx;
		const pvy = chob.vy;

		if (chob.vx != 0) {
			chob.vx -= Math.sign(chob.vx) * chob.a * delta;
		}
		if (chob.vy != 0) {
			chob.vy -= Math.sign(chob.vy) * chob.a * delta;
		}
		if (Math.sign(chob.vx) != Math.sign(pvx)) {
			chob.vx = 0;
		}
		if (Math.sign(chob.vy) != Math.sign(pvy)) {
			chob.vy = 0;
		}


	}
}

// TODO remove
function TextBox(x, y, w) {
	this.x = x;
	this.y = y;
	// width in letter count
	this.w = w;
	//this.i = array.length;
	this.contents = ""
	/*
	array.push(this);
	this.remove = function() {
		array.splice(this.i, 1);
	}*/
	this.print = function(ctx) {
		var x_offset = 0;
		var y_offset = 0;
		for (var i = 0; i <= this.contents.length; i++) {
			if (this.contents[i] == '\n') {
				x_offset = i;
				y_offset += letters_count_to_pixels(1);
			}
			const cx = (((i - x_offset) * 6) % (this.w * 6));
			const cy = Math.floor((i * 6) / (this.w * 6)) * 6;
			const nx = this.x + cx;
			const ny = this.y + cy + y_offset;

			/*
			console.log("nx " + nx);
			console.log("ny " + ny);
			console.log("cx " + cx);
			console.log("cy " + cy);
			*/

			if (i == this.contents.length) {	
				charToScreen(ctx, "_", nx, ny)
			} else {
				charToScreen(ctx, this.contents[i], nx, ny)
			}
		}
	}
}

export const letters_count_to_pixels = (count) => count * 6;
export const pixels_to_letters_count = (pixels) => Math.floor(pixels / 6);

