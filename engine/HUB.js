class HUB {
	static draw(name, inMag, ammo, image) {
		ctx.save()
		ctx.globalAlpha = 0.7
		ctx.fillStyle = '#ddd'
		ctx.fillRect(canvas.width - 135, canvas.height - 160, 140, 160)
		ctx.restore()

		ctx.drawImage(
			image,
			0,
			0,
			121,
			121,
			canvas.width - 110,
			canvas.height - 120,
			90,
			90
		)

		ctx.save()
		ctx.fillStyle = '#000'
		ctx.textAlign = 'center'
		ctx.font = '20px sans-serif'
		ctx.fillText(
			`${name}`.toUpperCase(),
			canvas.width - 65,
			canvas.height - 120
		)
		ctx.restore()

		ctx.save()
		ctx.fillStyle = '#000'
		ctx.font = '20px sans-serif'
		ctx.fillText(`${inMag} / ${ammo}`, canvas.width - 110, canvas.height - 20)
		ctx.restore()
	}
}
