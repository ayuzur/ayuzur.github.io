export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
const ratio = h / w;

canvas.width = 640;
canvas.height = Math.floor(canvas.width * ratio);
console.log(canvas.height);
//canvas.height = 480;
