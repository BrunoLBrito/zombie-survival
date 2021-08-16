class Zombie {
	constructor(x, y, radius, color, speed, colorEyes, life, type) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.speed = speed
		this.angle = 0
		this.velocity = { x: 0, y: 0 }
		this.colorEyes = colorEyes
		this.radiusStart = 0
		this.life = life
		this.type = type
		this.currentLife = this.life
		this.sizeBarHP = 40

		this.image = imageSprite('zombie')
	}

	update() {
		if (this.radiusStart < this.radius) {
			this.radiusStart += 0.5
		} else {
			this.angle = Math.atan2(player.y - this.y, player.x - this.x)

			this.x += this.velocity.x + Math.cos(this.angle) * this.speed
			this.y += this.velocity.y + Math.sin(this.angle) * this.speed

			this.velocity.x *= 0.925
			this.velocity.y *= 0.925

			for (let i in zombies) {
				const zombie = zombies[i]

				if (zombie != this) {
					const dist = Math.hypot(this.x - zombie.x, this.y - zombie.y)

					if (dist < this.radius + zombie.radius) {
						const angle = Math.atan2(this.y - zombie.y, this.x - zombie.x)
						this.velocity.x += Math.cos(angle) * 0.2
						this.velocity.y += Math.sin(angle) * 0.2
					}
				}
			}
		}
	}

	hurt(damage) {
		this.currentLife -= damage
	}

	eyes() {
		for (let x = -1; x <= 1; x += 2) {
			ctx.save()
			ctx.beginPath()
			ctx.strokeStyle = 'gray'
			ctx.fillStyle = this.colorEyes
			ctx.arc(
				this.x +
					(Math.cos(this.angle + (x * 40 * Math.PI) / 180) *
						this.radiusStart) /
						2,
				this.y +
					(Math.sin(this.angle + (x * 40 * Math.PI) / 180) *
						this.radiusStart) /
						2,
				this.radiusStart / 4,
				0,
				2 * Math.PI
			)
			ctx.lineWidth = 1
			ctx.fill()
			ctx.stroke()
			ctx.restore()
		}
	}

	hp() {
		ctx.save()
		ctx.fillStyle = 'red'
		ctx.fillRect(
			this.x - this.sizeBarHP / 2,
			this.y - this.radiusStart - 10,
			this.sizeBarHP,
			4
		)
		ctx.restore()

		ctx.save()
		ctx.fillStyle = 'green'
		ctx.fillRect(
			this.x - this.sizeBarHP / 2,
			this.y - this.radiusStart - 10,
			(this.currentLife / this.life) * this.sizeBarHP,
			4
		)
		ctx.restore()

		// ctx.save()
		// ctx.fillStyle = '#fff'
		// ctx.fillText(`${Math.floor((this.currentLife / this.life) * 100)}%`, this.x - 11, this.y - this.radiusStart - 10)
		// ctx.restore()
	}

	draw() {
		ctx.save()
		ctx.beginPath()
		// ctx.shadowColor = 'rgba(0,0,0, 0.3)';
		ctx.strokeStyle = 'gray'
		// ctx.shadowBlur = 15;
		// ctx.shadowOffsetX = 5;
		// ctx.shadowOffsetY = 0;
		ctx.fillStyle = this.color
		ctx.arc(this.x, this.y, this.radiusStart, 0, 2 * Math.PI)
		ctx.stroke()
		ctx.lineWidth = 1
		ctx.fill()
		ctx.restore()

		// ctx.save()
		// ctx.translate(this.x, this.y)
		// ctx.rotate(this.angle)
		// ctx.drawImage(
		// 	this.image,
		// 	0,
		// 	0,
		// 	this.image.width,
		// 	this.image.height,
		// 	-40 / 2,
		// 	-40 / 2,
		// 	40,
		// 	40
		// )
		// ctx.restore()

		this.hp()
		this.eyes()
	}

	destroy() {
		zombies.splice(zombies.indexOf(this), 1)
	}
}
