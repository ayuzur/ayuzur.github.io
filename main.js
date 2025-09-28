import {
	charToScreen,
	TextBox,
} from "./mod/minter.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 480;

const clear_screen = (ctx) => ctx.clearRect(0, 0, canvas.width, canvas.height);

const text = new TextBox(2, 6, 106);
text.contents += "about.txt github.txt projects.txt contact.txt\n\n"
var restrict_text_size = text.contents.length;
text.print(ctx);

const process_input = (str) => {
	console.log(str);
}

document.addEventListener("keydown", function(e) {
	clear_screen(ctx);
	if (e.key == "Backspace" && text.contents.length > restrict_text_size) {
		const len = text.contents.length;
		if (len > 0) {
			text.contents = text.contents.substring(0, len - 1);
		}
	}
	else if (e.key == "Enter") {
		text.contents += "\n";
		const sub = text.contents.substring(restrict_text_size, text.contents.length - 1);
		process_input(sub);
		restrict_text_size = text.contents.length;
	}
	else {
		if (e.key.length == 1) {
			text.contents += e.key.toLowerCase();
		}
	}
	text.print(ctx);

});

