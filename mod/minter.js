// sets up spritesheet

const textSpriteSheet = new Image();
textSpriteSheet.src = "img/textSpriteSheet.png";

const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2",
"3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*",
"(", ")", "-", "+", "_", "=", "{", "}", "[", "]", "|", "\\", ":", ";", "\"",
"'", "<", ">", ".", ",", "/", "?", "~", "\`"];

const charToScreen = (ctx, key, x, y) => {	
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

const letters_count_to_pixels = (count) => count * 6;
const pixels_to_letters_count = (pixels) => Math.floor(pixels / 6);

export { 
	charToScreen,
	TextBox,
	letters_count_to_pixels,
	pixels_to_letters_count,
};
