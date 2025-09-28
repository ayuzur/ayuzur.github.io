// expects params to have .x .y properties
export const dist = (obj1, obj2) => {
	const dx = obj1.x - obj2.x;
	const dy = obj1.y - obj2.y;
	return Math.sqrt(dx * dx + dy * dy);
}

export const vect = (from_point, to_point) => {
	const dx = to_point.x - from_point.x;
	const dy = to_point.y - from_point.y;
	const vec = {
		x: dx,
		y: dy,
	};
	return vec; 
}

export const magnitude = (vec) => {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

export const normalize = (vec) => {
	const mag = magnitude(vec);
	var ratio = 0;
	if (mag != 0) {
		ratio = 1 / mag;
	}
	vec.x *= ratio;
	vec.y *= ratio;
}

export const vec_mult = (vec, factor) => {
	vec.x *= factor;
	vec.y *= factor;
}
