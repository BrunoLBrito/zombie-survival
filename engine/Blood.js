class Blood {
	constructor(x, y, frame, size) {
		this.x = x
		this.y = y
		this.image = new Image()
		this.width = 150
		this.height = 130
		this.alpha = 0.8
		this.image.src = './sprites/blood.png'
		this.frame = frame
		this.size = size
	}

	update() {
		// this.alpha -= 0.01
	}

	draw() {
		ctx.save()
		ctx.globalAlpha = this.alpha
		ctx.drawImage(
			this.image,
			this.width * this.frame,
			0,
			this.width,
			this.height,
			this.x - this.size / 2,
			this.y - this.size / 2,
			this.size,
			this.size
		)
		ctx.restore()
	}

	destroy() {
		bloods.splice(bloods.indexOf(this), 1)
	}
}
