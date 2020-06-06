const mix = (color_1, color_2, weight = .5) => {
	const d2h = (d) => d.toString(16)  // convert a decimal value to hex
	const h2d = (h) => parseInt(h, 16) // convert a hex value to decimal 

	let color = "#"

	for(let i = 1; i <= 6; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
		const v1 = h2d(color_1.substr(i, 2)) // extract the current pairs
		const v2 = h2d(color_2.substr(i, 2))

		// combine the current pairs from each source color, according to the specified weight
		let val = d2h(Math.floor(v2 + (v1 - v2) * weight))

		while(val.length < 2) {
			val = '0' + val // prepend a '0' if val results in a single digit
		}

		color += val; // concatenate val to our new color string
	}

	return color; // PROFIT!
}

export default mix