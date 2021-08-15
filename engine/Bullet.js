class Bullet {
	constructor(x, y, radius, color, angle, velocity, damage) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.angle = angle
		this.velocity = velocity
		this.damage = damage
	}

	update() {
		this.x += this.velocity.x
		this.y += this.velocity.y

		this.kill()
	}

	kill() {
		zombies.forEach(zombie => {
			const dist = Math.hypot(this.x - zombie.x, this.y - zombie.y)

			if (dist < this.radius + zombie.radiusStart) {
				zombie.hurt(this.damage)
				zombieHitAudio.currentTime = 0
				zombieHitAudio.play()
				this.destroy()
				if (zombie.currentLife && zombie.currentLife >= 10) {
					zombieHitAudio.currentTime = 0
					zombieHitAudio.play()

					if (zombie.type == 'ultra') {
						for (let i = 0; i < 3; i++) {
							particles.push(
								new Particle(
									zombie.x,
									zombie.y,
									Math.random() * 8,
									zombie.color,
									{
										x: (Math.random() - 0.5) * (Math.random() * 8),
										y: (Math.random() - 0.5) * (Math.random() * 8),
									}
								)
							)
						}
					} else {
						for (let i = 0; i < 15; i++) {
							particles.push(
								new Particle(
									zombie.x,
									zombie.y,
									Math.random() * 4,
									zombie.color,
									{
										x: (Math.random() - 0.5) * (Math.random() * 8),
										y: (Math.random() - 0.5) * (Math.random() * 8),
									}
								)
							)
						}
					}
				} else {
					for (let i = 0; i < zombie.radius * 2; i++) {
						particles.push(
							new Particle(
								zombie.x,
								zombie.y,
								Math.random() * 2,
								'#f00',
								{
									x: (Math.random() - 0.5) * (Math.random() * 8),
									y: (Math.random() - 0.5) * (Math.random() * 8),
								}
							)
						)
					}

					bloods.push(new Blood(zombie.x, zombie.y, rand(0, 3), 70))

					switch (zombie.type) {
						case 'normal':
							score += zombiesTypes[0].point
							zombiesTypes[0].audio.currentTime = 0
							zombiesTypes[0].audio.play()
							break
						case 'speed':
							score += zombiesTypes[1].point
							zombiesTypes[1].audio.currentTime = 0
							zombiesTypes[1].audio.play()
							break

						case 'hulk':
							score += zombiesTypes[2].point
							zombiesTypes[2].audio.currentTime = 0
							zombiesTypes[2].audio.play()
							break

						case 'boss':
							score += zombiesTypes[3].point
							zombiesTypes[3].audio.currentTime = 0
							zombiesTypes[3].audio.play()
							break
						case 'ultra':
							score += zombiesTypes[4].point
							zombiesTypes[4].audio.currentTime = 0
							zombiesTypes[4].audio.play()
							break
					}

					zombie.destroy()
				}
			}
		})
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
