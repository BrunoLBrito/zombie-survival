class HUB {
	constructor(x, y, color) {
		this.x = x
		this.y = y
		this.color = color
		this.inMag = 0
		this.ammo = 0
		this.pick = 0
	}

	static draw(inMag, ammo, image) {
		// ctx.drawImage(
		// 	image,
		// 	0,
		// 	0,
		// 	121,
		// 	121,
		// 	canvas.width - 121,
		// 	canvas.height - 170,
		// 	100,
		// 	100
		// )

		ctx.save()
		ctx.fillStyle = '#fff'
		ctx.font = '20px sans-serif'
		ctx.fillText(`${inMag} / ${ammo}`, canvas.width - 110, canvas.height - 50)
		ctx.restore()
	}
}
