class Player {
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.colorEyes = '#fff'
		this.angle = 0
		this.speed = 5

		this.weapons = 0
		this.isDead = false

		this.safezoneRadius = 300
		this.shooting = false
	}

	update() {
		this.angle = Math.atan2(mouse.y - this.y, mouse.x - this.x)

		// ctx.moveTo(this.x, this.y)
		// ctx.lineTo(mouse.x, mouse.y)

		ctx.stroke()
		this.move()
	}

	move() {
		if (KEY_LEFT in keys) {
			this.x -= this.speed
		} else if (KEY_RIGHT in keys) {
			this.x += this.speed
		}

		if (KEY_UP in keys) {
			this.y -= this.speed
		} else if (KEY_DOWN in keys) {
			this.y += this.speed
		}
	}

	eyes() {
		for (let x = -1; x <= 1; x += 2) {
			// ctx.strokeStyle = 'gray'
			ctx.fillStyle = this.colorEyes
			ctx.beginPath()
			ctx.arc(
				this.x +
					(Math.cos(this.angle + (x * 40 * Math.PI) / 180) * this.radius) /
						2,
				this.y +
					(Math.sin(this.angle + (x * 40 * Math.PI) / 180) * this.radius) /
						2,
				this.radius / 4,
				0,
				2 * Math.PI
			)
			ctx.fill()
			ctx.stroke()
		}
	}

	shoot() {
		if (!this.isDead && !this.shooting) {
			this.shooting = true

			let angle = Math.atan2(mouse.y - this.y, mouse.x - this.x)

			angle += (Math.random() * weapons[this.weapons].inaccuracy) / 2

			weapons[this.weapons].audio.currentTime = 0
			weapons[this.weapons].audio.play()

			for (
				let i = -(weapons[this.weapons].spray - 1) / 2;
				i <= (weapons[this.weapons].spray - 1) / 2;
				i++
			) {
				const velocity = {
					x: Math.cos(angle + i / 10) * 30,
					y: Math.sin(angle + i / 10) * 30,
				}

				bullets.push(
					new Bullet(
						this.x,
						this.y,
						weapons[this.weapons].bulletSize,
						'#000',
						angle,
						velocity
					)
				)
			}

			setTimeout(() => {
				this.shooting = false
			}, weapons[this.weapons].rate * 1000)
		}
	}

	hands() {
		// for (let i = 0; i < 3; i++) {
		//    particles.push(
		//       new Particle(
		//          this.x + (Math.cos(this.angle)) * (this.radius - 10),
		//          this.y + (Math.sin(this.angle)) * (this.radius - 10),
		//          Math.random() * 8,
		//          '#f00',
		//          {
		//             x: (Math.random() - 0.5) * (Math.random() * 8),
		//             y: (Math.random() - 0.5) * (Math.random() * 8),
		//          }
		//       )
		//    )
		// }
		// for (let x = -1; x <= 1; x += 2) {
		//    // ctx.strokeStyle = 'gray'
		//    ctx.fillStyle = '#f00'
		//    ctx.beginPath()
		//    ctx.arc(
		//       this.x + (Math.cos(this.angle)) * (this.radius + 10),
		//       this.y + (Math.sin(this.angle)) * (this.radius + 10),
		//       this.radius / 4,
		//       0,
		//       2 * Math.PI
		//    )
		//    ctx.fill()
		//    ctx.stroke()
		// }
	}

	safeZone() {
		ctx.strokeStyle = '#000'
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.safezoneRadius, 0, 2 * Math.PI)
		ctx.stroke()
	}

	gun() {
		if (KEY_PISTOL in keys) {
			this.weapons = 0
		} else if (KEY_SHOTGUN in keys) {
			this.weapons = 1
		} else if (KEY_UZI in keys) {
			this.weapons = 2
		} else if (KEY_CANNON in keys) {
			this.weapons = 3
		}

		ctx.save()
		ctx.fillStyle = weapons[this.weapons].color
		ctx.translate(this.x, this.y)
		ctx.rotate(this.angle)
		ctx.fillRect(
			this.radius - 2,
			-weapons[this.weapons].height / 2,
			weapons[this.weapons].width,
			weapons[this.weapons].height
		)
		ctx.restore()
	}

	draw() {
		// this.safeZone()

		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.restore()

		this.eyes()
		this.hands()
		this.gun()
	}
}