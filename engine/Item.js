class Item {
	constructor(image, x, y, size) {
		this.image = image
		this.x = x
		this.y = y
		this.size = size
		this.velocity = 0
		this.time = 5000
	}

	update() {
		this.velocity++
		if (this.velocity < 60) {
			this.y -= 0.2
		} else if (this.velocity > 61) {
			this.y += 0.2
		}
		if (this.velocity > 121) {
			this.velocity = 0
		}

		if (!isGetItem) {
			this.getItem()
		}
	}

	getItem() {
		const dist = Math.hypot(this.x - player.x, this.y - player.y)

		if (dist < this.size + player.radius) {
			itemShieldSound.currentTime = 0
			itemShieldSound.play()
			isGetItem = true
			player.isShield = true
			this.destroy()

			setTimeout(() => {
				player.isShield = false
				isGetItem = false
			}, this.time)
		}
	}

	draw() {
		ctx.drawImage(
			this.image,
			0,
			0,
			this.image.width,
			this.image.height,
			this.x,
			this.y,
			this.size,
			this.size
		)
	}

	destroy() {
		items.splice(items.indexOf(this), 1)
	}
}
