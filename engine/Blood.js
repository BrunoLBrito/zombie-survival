class Blood {
  constructor(x, y, frame, size) {
    this.x = x
    this.y = y
    this.image = new Image()
    this.width = 150
    this.height = 130
    this.alpha = 0.7
    this.image.src = './sprites/blood2.png'
    this.frame = 0
    this.size = size
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.drawImage(
      this.image,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    )
    ctx.restore()
  }

  update() {
    this.draw()
  }

  fadeOut() {
    this.alpha = this.alpha / 1.1
  }

  destroy() {
    // bloods.shift()
    bloods.splice(bloods.indexOf(this), 1)
  }
}
