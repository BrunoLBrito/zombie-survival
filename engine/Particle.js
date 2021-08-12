class Particle {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
		this.alpha = 1
		this.friction = 0.99
	}

	draw() {
		ctx.save()
		ctx.globalAlpha = this.alpha
		ctx.fillStyle = this.color
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fill()
		ctx.restore()
	}
	update() {
		this.draw()

		this.velocity.x *= this.friction
		this.velocity.y *= this.friction

		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y

		this.alpha -= 0.01
	}

	destroy() {
		particles.splice(particles.indexOf(this), 1)
	}
}
