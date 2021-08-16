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

		// Remove da memoria a bala assim que sair da tela
		if (
			this.x + this.radius < 0 ||
			this.x > canvas.width - this.radius ||
			this.y + this.radius < 0 ||
			this.y > canvas.height - this.radius
		) {
			this.destroy()
		}
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
							addPointsAndSoundPerZombie(zombiesTypes[0])
							break

						case 'speed':
							addPointsAndSoundPerZombie(zombiesTypes[1])
							break

						case 'hulk':
							addPointsAndSoundPerZombie(zombiesTypes[2])
							break

						case 'boss':
							addPointsAndSoundPerZombie(zombiesTypes[3])
							break

						case 'ultra':
							addPointsAndSoundPerZombie(zombiesTypes[4])
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
