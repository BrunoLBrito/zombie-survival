class Weapon {
	constructor(weapon) {
		Object.keys(weapon).forEach(nameWeapon => {
			this[nameWeapon] = weapon[nameWeapon]
		})

		this.isShooting = false
		this.angle = 0
	}

	update() {
		this.angle = player.angle
	}

	shoot() {
		if (!player.isDead && !this.shooting) {
			this.shooting = true

			// let angle = Math.atan2(mouse.y - this.y, mouse.x - this.x)

			this.angle += (Math.random() * this.inaccuracy) / 2

			this.audio.currentTime = 0
			this.audio.play()

			for (let i = -(this.spray - 1) / 2; i <= (this.spray - 1) / 2; i++) {
				const velocity = {
					x: Math.cos(this.angle + i / 10) * 30,
					y: Math.sin(this.angle + i / 10) * 30,
				}

				bullets.push(
					new Bullet(
						player.x,
						player.y,
						this.bulletSize,
						'#000',
						this.angle,
						velocity
					)
				)
			}

			setTimeout(() => {
				this.shooting = false
			}, this.rate * 1000)
		}
	}

	draw() {
		ctx.save()
		ctx.fillStyle = this.color
		ctx.translate(player.x, player.y)
		ctx.rotate(this.angle)
		ctx.fillRect(player.radius - 2, -this.height / 2, this.width, this.height)
		ctx.restore()
	}
}
