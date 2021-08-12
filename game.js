const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
canvas.style.cursor = 'crosshair'

const zombieHitAudio = setAudio('zombie-hit', 'mp3', 0.2)
const playerDeadSound = setAudio('dead-player', 'mp3', 0.2)
const zombiesBiteSound = setAudio('zombies-bite', 'mp3', 0.5)

const KEY_LEFT = 'KeyA'
const KEY_RIGHT = 'KeyD'
const KEY_UP = 'KeyW'
const KEY_DOWN = 'KeyS'

const KEY_PISTOL = 'Digit1'
const KEY_SHOTGUN = 'Digit2'
const KEY_UZI = 'Digit3'
const KEY_CANNON = 'Digit4'

const keys = {}

const position = canvas.getBoundingClientRect()
const mouse = {
	x: 0,
	y: 0,
	click: false,
}

const zombies = []
const bullets = []
const particles = []
const weaponsNo = []
const bloods = []
const totalZombie = 25
const timeSpawnZombie = [500, 2000, 5000, 10000, 60000]

let frame = 0
let score = 0

// Events
canvas.addEventListener('mousemove', e => {
	mouse.x = e.clientX - position.left
	mouse.y = e.clientY - position.top
})
window.addEventListener('keydown', e => (keys[e.code] = true))
window.addEventListener('keyup', e => delete keys[e.code])
window.addEventListener('mousedown', e => (mouse.click = true))
window.addEventListener('mouseup', e => (mouse.click = false))

window.addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
})

// Mapeando os zumbis
for (let i = 0; i < zombiesTypes.length; i++) {
	spawnZombies(zombiesTypes[i], zombiesTypes[i].name, timeSpawnZombie[i])
}

setInterval(() => {
	if (bloods.length > 20) {
		bloods.shift()
	}
}, 200)

const player = new Player(canvas.width / 2, canvas.height / 2, 15, '#00f')

// Mapeando armas para o array weaponsNo
for (let i = 0; i < weapons.length; i++) {
	weaponsNo.push(new Weapon(weapons[i]))
}

function run() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// console.log({ particles: particles.length, bullets: bullets.length, zombies: zombies.length })
	drawGrid(ctx, 'rgba(102,153,51, 1)', 200, 200)

	ctx.save()
	ctx.fillStyle = '#fff'
	ctx.font = '35px creepster'
	ctx.fillText(
		`Recorde: ${
			localStorage.getItem('score') ? localStorage.getItem('score') : 0
		}`,
		30,
		40
	)
	ctx.restore()

	ctx.save()
	ctx.fillStyle = '#fff'
	ctx.font = '35px creepster'
	ctx.fillText(`Pontuação: ${score}`, 30, 80)
	ctx.restore()

	if (mouse.click) {
		weaponsNo[player.pickup].shoot()
	}

	particles.forEach(particle => {
		if (particle.alpha <= 0) {
			particle.destroy()
		} else {
			particle.update()
		}
	})

	bloods.forEach(blood => {
		blood.update()
		blood.draw()
	})

	for (let i in bullets) {
		const bullet = bullets[i]

		bullet.update()
		bullet.draw()

		if (
			bullet.x + bullet.radius < 0 ||
			bullet.x > canvas.width - bullet.radius ||
			bullet.y + bullet.radius < 0 ||
			bullet.y > canvas.height - bullet.radius
		) {
			bullet.destroy()
		}
	}

	for (let i in zombies) {
		zombies[i].update()
		zombies[i].draw()
	}

	if (!player.isDead) {
		player.update()
		player.draw()
	}

	if (!player.isDead) {
		weaponsNo[player.pickup].update()
		weaponsNo[player.pickup].draw()
	}

	// Hit e morte do zombie
	zombies.forEach((zombie, indexZombie) => {
		bullets.forEach((bullet, indexBullet) => {
			const dist = Math.hypot(zombie.x - bullet.x, zombie.y - bullet.y)

			if (dist < zombie.radiusStart + bullet.radius) {
				zombie.currentLife -= weaponsNo[player.pickup].damage

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
				bullet.destroy()
			}
		})
	})

	// Morte e hit no player

	zombies.forEach((zombie, indexZombie) => {
		const dist = Math.hypot(player.x - zombie.x, player.y - zombie.y)

		if (dist < zombie.radiusStart + player.radius) {
			if (!player.isDead) {
				for (let i = 0; i < player.radius * 4; i++) {
					particles.push(
						new Particle(player.x, player.y, Math.random() * 4, '#f00', {
							x: (Math.random() - 0.5) * (Math.random() * 8),
							y: (Math.random() - 0.5) * (Math.random() * 8),
						})
					)
				}
				playerDeadSound.currentTime = 0
				playerDeadSound.play()

				zombiesBiteSound.currentTime = 0
				zombiesBiteSound.play()
				bloods.push(new Blood(player.x, player.y, rand(0, 3), 130))
				saveBestScore(score)
				player.isDead = true
			}
		}
	})

	requestAnimationFrame(run)
	frame++
}

run()
