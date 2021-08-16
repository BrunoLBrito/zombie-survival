const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
canvas.style.cursor = 'crosshair'

const zombieHitAudio = setAudio('zombie-hit', 'mp3', 0.2)
const playerDeadSound = setAudio('dead-player', 'mp3', 0.2)
const zombiesBiteSound = setAudio('zombies-bite', 'mp3', 0.5)
const reloadSound = setAudio('reload', 'mp3', 0.5)
const outOfAmmoSound = setAudio('outofammo', 'wav', 0.5)
const itemShieldSound = setAudio('item-shield-sound', 'mp3', 0.8)

const KEY_LEFT = 'KeyA'
const KEY_RIGHT = 'KeyD'
const KEY_UP = 'KeyW'
const KEY_DOWN = 'KeyS'

const KEY_PISTOL = 'Digit1'
const KEY_SHOTGUN = 'Digit2'
const KEY_UZI = 'Digit3'
const KEY_CANNON = 'Digit4'

const KEY_RELOAD = 'KeyR'

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
const items = []
const bloods = []
const totalZombie = 25
let isGetItem = false
const timeSpawnZombie = [500, 2000, 5000, 10000, 30000]

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
	// spawnZombies(zombiesTypes[4], zombiesTypes[i].name, 5000)
}

// Removendo sprite de sangue depois de 200ms desde que a quantidade seja maior que 20
setInterval(() => {
	if (bloods.length > 20) {
		bloods.shift()
	}
}, 200)

const player = new Player(canvas.width / 2, canvas.height / 2, 20, '#00f')

// Mapeando armas para o array weaponsNo
for (let i = 0; i < weapons.length; i++) {
	weaponsNo.push(new Weapon(weapons[i]))
}

setInterval(() => {
	items.push(
		new Item(
			imageSprite('shield-image'),
			rand(0, canvas.width - 50),
			rand(0, canvas.height - 50),
			50
		)
	)
}, 10000)

function run() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	drawGrid(ctx, 'rgba(102,153,51, 1)', 200, 200)

	HUB.draw(
		weaponsNo[player.pickup].name,
		weaponsNo[player.pickup].inMag,
		weaponsNo[player.pickup].ammo,
		weaponsNo[player.pickup].image
	)

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

	for (let i in items) {
		items[i].update()
		if (items[i]) {
			items[i].draw()
		}
	}

	for (let i in bullets) {
		const bullet = bullets[i]

		bullet.update()
		bullet.draw()
	}

	for (let i in zombies) {
		// zombies[i].update()
		// zombies[i].draw()
	}

	if (!player.isDead) {
		player.update()
		player.draw()

		weaponsNo[player.pickup].update()
		weaponsNo[player.pickup].draw()
	}

	zombies.forEach(zombie => {
		const dist = Math.hypot(zombie.x - player.x, zombie.y - player.y)

		if (dist < zombie.radiusStart + 50 && player.isShield) {
			bloods.push(new Blood(zombie.x, zombie.y, rand(0, 3), 70))

			for (let i = 0; i < zombie.radius * 2; i++) {
				particles.push(
					new Particle(zombie.x, zombie.y, Math.random() * 2, '#f00', {
						x: (Math.random() - 0.5) * (Math.random() * 8),
						y: (Math.random() - 0.5) * (Math.random() * 8),
					})
				)
			}

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
	})

	// Morte e hit no player
	zombies.forEach(zombie => {
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

document.addEventListener('DOMContentLoaded', run)
