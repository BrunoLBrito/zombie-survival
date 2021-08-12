class Bullet {
	constructor(x, y, radius, color, angle, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.angle = angle
		this.velocity = velocity
	}

	update() {
		this.x += this.velocity.x
		this.y += this.velocity.y
	}

	draw() {
		ctx.save()
		ctx.fillStyle = this.color
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.restore()
	}

	destroy() {
		bullets.splice(bullets.indexOf(this), 1)
	}
}
