// const canvasbg = document.querySelector('#canvas2')
// const ctxbg = canvasbg.getContext('2d')

// ctxbg.width = innerWidth
// ctxbg.height = innerHeight

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
const bloods = []
const totalZombie = 25
const timeSpawnZombie = [500, 2000, 5000, 10000, 60000]

let frame = 0
let score = 0

const weapons = [
	{
		name: 'pistol',
		color: 'gray',
		width: 8,
		height: 8,
		spray: 1,
		damage: 10,
		audio: setAudio('glock', 'mp3', 0.1),
		autofire: true,
		rate: 0.4,
		inaccuracy: 0.1,
		bulletSize: 2,
	},
	{
		name: 'shotgun',
		color: 'gray',
		width: 20,
		height: 20,
		spray: 5,
		damage: 30,
		audio: setAudio('shotgun', 'mp3', 0.1),
		autofire: true,
		rate: 1,
		inaccuracy: 0.2,
		bulletSize: 3,
	},
	{
		name: 'uzi',
		color: '#000',
		width: 25,
		height: 15,
		spray: 2,
		damage: 20,
		audio: setAudio('uzi', 'mp3', 0.1),
		autofire: true,
		rate: 0.05,
		inaccuracy: 0.2,
		bulletSize: 3,
	},
	{
		name: 'cannon',
		color: '#ff0',
		width: 30,
		height: 23,
		spray: 1,
		damage: 10000,
		audio: setAudio('cannon', 'mp3', 0.8),
		autofire: true,
		rate: 2,
		inaccuracy: 0.2,
		bulletSize: 20,
	},
]

const zombiesTypes = [
	{
		name: 'normal',
		speed: 2,
		life: 10,
		color: '#9ef799',
		radius: 15,
		eyes: '#fff',
		point: 10,
		audio: setAudio('dead-zombie-normal', 'mp3', 0.2),
	},
	{
		name: 'speed',
		speed: 6,
		life: 20,
		color: '#f00',
		radius: 15,
		eyes: '#0f0',
		point: 20,
		audio: setAudio('dead-zombie-speed', 'mp3', 0.2),
	},
	{
		name: 'hulk',
		speed: 3,
		life: 60,
		color: '#000',
		radius: 20,
		eyes: '#ff0',
		point: 30,
		audio: setAudio('dead-zombie-hulk', 'mp3', 0.2),
	},
	{
		name: 'boss',
		speed: 2,
		life: 1000,
		color: 'purple',
		radius: 50,
		eyes: '#ff0',
		point: 100,
		audio: setAudio('dead-zombie-boss', 'mp3', 0.2),
	},
	{
		name: 'ultra',
		speed: 4,
		life: 10000,
		color: '#ff0',
		radius: 200,
		eyes: '#f00',
		point: 1000,
		audio: setAudio('dead-zombie-ultra', 'mp3', 0.2),
	},
]

// Events
canvas.addEventListener('mousemove', e => {
	mouse.x = e.clientX - position.left
	mouse.y = e.clientY - position.top
})
window.addEventListener('keydown', e => (keys[e.code] = true))
window.addEventListener('keyup', e => delete keys[e.code])
window.addEventListener('mousedown', e => {
	mouse.click = true
})
window.addEventListener('mouseup', e => {
	mouse.click = false
})

window.addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
})
// window.addEventListener('click', e => {

//    if (!player.isDead) {
//       const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x)

//       weapons[player.weapons].audio.currentTime = 0
//       weapons[player.weapons].audio.play()

//       for (let i = -(weapons[player.weapons].spray - 1) / 2; i <= (weapons[player.weapons].spray - 1) / 2; i++) {
//          const velocity = {
//             x: Math.cos(angle + i / 10) * 30,
//             y: Math.sin(angle + i / 10) * 30
//          }

//          bullets.push(new Bullet(player.x, player.y, 3, '#000', angle, velocity))
//       }

//    }

// })

const colorRandom = ['#9ef799', '#f00', '#ff0']

function spawnZombies(zombie, typeZombie, timeSpawn) {
	setInterval(() => {
		if (zombies.length < totalZombie) {
			let zombiesRandom = zombie

			function collideRandom() {
				let x = rand(0, canvas.width)
				let y = rand(0, canvas.height)

				const dist = Math.hypot(player.x - x, player.y - y)

				if (dist < player.safezoneRadius + zombiesRandom.radius) {
					collideRandom()
				} else {
					if (zombiesRandom.name === typeZombie) {
						zombies.push(
							new Zombie(
								x,
								y,
								zombiesRandom.radius,
								zombiesRandom.color,
								zombiesRandom.speed,
								zombiesRandom.eyes,
								zombiesRandom.life,
								zombiesRandom.name
							)
						)
					}
				}
			}
			collideRandom()
		}
	}, timeSpawn)
}

spawnZombies(zombiesTypes[0], 'normal', timeSpawnZombie[0])
spawnZombies(zombiesTypes[1], 'speed', timeSpawnZombie[1])
spawnZombies(zombiesTypes[2], 'hulk', timeSpawnZombie[2])
spawnZombies(zombiesTypes[3], 'boss', timeSpawnZombie[3])
spawnZombies(zombiesTypes[4], 'ultra', timeSpawnZombie[4])

setInterval(() => {
	if (bloods.length > 20) {
		bloods.shift()
	}
}, 200)

function saveBestScore(score) {
	if (localStorage.getItem('score') < score) {
		localStorage.setItem('score', score)
	}
}

const player = new Player(canvas.width / 2, canvas.height / 2, 15, '#00f')

// function drawShadow(alpha) {
//    let gradient = ctx.createRadialGradient(
//       player.x + canvasbg.width / 2,
//       player.y + canvasbg.height / 2,
//       500,
//       player.x + canvasbg.width,
//       player.y + canvasbg.height,
//       0
//    )

//    gradient.addColorStop(0, 'rgba(0,0,0,' + alpha * 0.95 + ')')
//    gradient.addColorStop(0.8, 'rgba(0,0,0,' + alpha * 0.5 + ')')
//    gradient.addColorStop(1, 'rgba(0,0,0,' + alpha * 0.3 + ')')

//    ctx.fillStyle = gradient
//    ctx.fillRect(0, 0, canvas.width, canvas.height)
// }

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

	// if (autofire && frame % weapons[player.weapons].rate === 0 && weapons[player.weapons].autofire) {
	//    if (!player.isDead) {
	//       let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x)

	//       angle += (Math.random() * weapons[player.weapons].inaccuracy) / 2

	//       weapons[player.weapons].audio.currentTime = 0
	//       weapons[player.weapons].audio.play()

	//       for (let i = -(weapons[player.weapons].spray - 1) / 2; i <= (weapons[player.weapons].spray - 1) / 2; i++) {
	//          const velocity = {
	//             x: Math.cos(angle + i / 10) * 30,
	//             y: Math.sin(angle + i / 10) * 30
	//          }

	//          bullets.push(new Bullet(player.x, player.y, weapons[player.weapons].bulletSize, '#000', angle, velocity))
	//       }

	//    }
	// }

	if (mouse.click) {
		player.shoot()
	}

	particles.forEach((particle, index) => {
		if (particle.alpha <= 0) {
			particle.destroy()
		} else {
			particle.update()
		}
	})

	bloods.forEach((blood, index) => {
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

	// drawShadow(1)

	if (!player.isDead) {
		player.draw()
		player.update()
	}

	// Hit e morte do zombie
	zombies.forEach((zombie, indexZombie) => {
		bullets.forEach((bullet, indexBullet) => {
			const dist = Math.hypot(zombie.x - bullet.x, zombie.y - bullet.y)

			if (dist < zombie.radiusStart + bullet.radius) {
				// zombie.currentLife -= weapons[player.weapons].damage
				zombie.currentLife =
					weapons[player.weapons].damage > zombie.currentLife
						? 0
						: zombie.currentLife - weapons[player.weapons].damage

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

					if (zombie.type === 'normal') {
						score += zombiesTypes[0].point
						zombiesTypes[0].audio.currentTime = 0
						zombiesTypes[0].audio.play()
					}
					if (zombie.type === 'speed') {
						score += zombiesTypes[1].point
						zombiesTypes[1].audio.currentTime = 0
						zombiesTypes[1].audio.play()
					}
					if (zombie.type === 'hulk') {
						score += zombiesTypes[2].point
						zombiesTypes[2].audio.currentTime = 0
						zombiesTypes[2].audio.play()
					}
					if (zombie.type === 'boss') {
						score += zombiesTypes[3].point
						zombiesTypes[3].audio.currentTime = 0
						zombiesTypes[3].audio.play()
					}

					if (zombie.type === 'ultra') {
						score += zombiesTypes[3].point
						zombiesTypes[4].audio.currentTime = 0
						zombiesTypes[4].audio.play()
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
