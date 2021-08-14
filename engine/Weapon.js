class Weapon {
	constructor(weapon) {
		Object.keys(weapon).forEach(nameWeapon => {
			this[nameWeapon] = weapon[nameWeapon]
		})

		this.isShooting = false
		this.isReloading = false
		this.angle = 0
	}

	update() {
		this.angle = player.angle
	}

	shoot() {
		if (this.inMag <= 0) {
			this.reload()
			return
		}

		if (
			!player.isDead &&
			!this.shooting &&
			this.inMag > 0 &&
			!this.isReloading
		) {
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

			this.inMag -= 1
			console.log(`${this.capacity} / ${this.ammo}`)

			setTimeout(() => {
				this.shooting = false
			}, this.rate * 1000)
		}
	}

	reload() {
		if (!this.isReloading) {
			if (this.inMag === this.capacity) return

			if (this.ammo > 0) {
				reloadSound.currentTime = 0
				reloadSound.play()
			} else {
				console.log('vazio')
				outOfAmmoSound.currentTime = 0
				outOfAmmoSound.play()
			}

			console.log('reload')
			this.isReloading = true

			setTimeout(() => {
				if (this.ammo < this.capacity - this.inMag) {
					this.inMag += this.ammo
					this.ammo = 0
				} else {
					this.ammo -= this.capacity - this.inMag
					this.inMag = this.capacity
				}
				this.isReloading = false
			}, this.reloadTime * 1000)
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
