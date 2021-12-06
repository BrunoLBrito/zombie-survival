class Bullet {
  constructor(x, y, radius, color, angle, velocity, damage, size) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.angle = angle
    this.velocity = velocity
    this.damage = damage
    this.image = imageSprite('bala')
    this.size = size
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
                new Particle(zombie.x, zombie.y, Math.random() * 8, zombie.color, {
                  x: (Math.random() - 0.5) * (Math.random() * 8),
                  y: (Math.random() - 0.5) * (Math.random() * 8)
                })
              )
            }
          } else {
            for (let i = 0; i < 15; i++) {
              particles.push(
                new Particle(zombie.x, zombie.y, Math.random() * 4, zombie.color, {
                  x: (Math.random() - 0.5) * (Math.random() * 8),
                  y: (Math.random() - 0.5) * (Math.random() * 8)
                })
              )
            }
          }
        } else {
          for (let i = 0; i < zombie.radius * 2; i++) {
            particles.push(
              new Particle(zombie.x, zombie.y, Math.random() * 2, '#f00', {
                x: (Math.random() - 0.5) * (Math.random() * 8),
                y: (Math.random() - 0.5) * (Math.random() * 8)
              })
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
    // ctx.save()
    // ctx.globalAlpha = 0.5
    // ctx.strokeStyle = 'rgba(255,255,255, 0.4)'
    // ctx.moveTo(player.x, player.y)
    // ctx.lineTo(this.x, this.y)
    // ctx.lineWidth = this.radius
    // ctx.stroke()
    // ctx.restore()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      -this.size,
      -aspectRatio(this.image.height, this.image.width, this.size) / 2 + 5,
      this.size,
      aspectRatio(this.image.height, this.image.width, this.size)
    )
    ctx.restore()

    // ctx.save()
    // ctx.fillStyle = this.color
    // ctx.beginPath()
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    // ctx.fill()
    // ctx.restore()
  }

  destroy() {
    bullets.splice(bullets.indexOf(this), 1)
  }
}
