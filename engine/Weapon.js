class Weapon {
  constructor(weapon) {
    Object.keys(weapon).forEach(nameWeapon => {
      this[nameWeapon] = weapon[nameWeapon]
    })

    this.isShooting = false
    this.isReloading = false
    this.angle = 0
    this.imageFlash = imageSprite('flash')
  }

  update() {
    this.angle = player.angle

    this.commands()
  }

  commands() {
    if (KEY_RELOAD in keys) {
      this.reload()
    }

    if (mouse.click) {
      this.shoot()
    }
  }

  shoot() {
    if (this.inMag <= 0) {
      this.reload()
      return
    }

    if (!player.isDead && !this.shooting && this.inMag > 0 && !this.isReloading) {
      this.shooting = true

      // let angle = Math.atan2(mouse.y - this.y, mouse.x - this.x)

      this.angle += (Math.random() * this.inaccuracy) / 2

      this.audio.currentTime = 0
      this.audio.play()

      const x = Math.cos(player.angle) * 60
      const y = Math.sin(player.angle) * 60

      ctx.save()
      ctx.translate(player.x + x, player.y + y)
      ctx.rotate(this.angle)
      ctx.drawImage(
        this.imageFlash,
        0,
        0,
        this.imageFlash.width,
        this.imageFlash.height,
        -10,
        -aspectRatio(this.imageFlash.height, this.imageFlash.width, 30) / 2 + 4,
        30,
        aspectRatio(this.imageFlash.height, this.imageFlash.width, 30)
      )
      ctx.restore()

      for (let i = -(this.spray - 1) / 2; i <= (this.spray - 1) / 2; i++) {
        const velocity = {
          x: Math.cos(this.angle + i / 10) * 15, // 20
          y: Math.sin(this.angle + i / 10) * 15
        }

        bullets.push(
          new Bullet(
            player.x + x,
            player.y + y,
            5, // this.bulletSize
            'gray',
            this.angle,
            velocity,
            this.damage,
            this.bulletSize
          )
        )

        // ctx.save()
        // ctx.fillStyle = '#ff0'
        // ctx.beginPath()
        // ctx.arc(player.x + x, player.y + y, 10, 0, Math.PI * 2)
        // ctx.fill()
        // ctx.restore()
      }

      this.inMag -= 1

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
    // ctx.save()
    // ctx.fillStyle = this.color
    // ctx.translate(player.x, player.y)
    // ctx.rotate(this.angle)
    // ctx.fillRect(player.radius - 2, -this.height / 2, this.width, this.height)
    // ctx.restore()
  }
}
