// Renderiza grid no background
function drawGrid(context, color, stepx, stepy) {
  context.strokeStyle = color
  context.lineWidth = 0.5

  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i, context.canvas.height)
    context.stroke()
  }

  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(context.canvas.width, i)
    context.stroke()
  }
}

// Config de audio
function setAudio(file, extension = 'mp3', volume = 0.3) {
  const audio = new Audio()
  audio.src = `./sounds/${file}.${extension}`
  audio.volume = volume
  audio.load()

  return audio
}

// Random com min e max
function rand(min, max) {
  // return Math.floor(Math.random() * (max - min + 1) - min)
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

// Salvar melhor pontução no localStorage
function saveBestScore(score) {
  if (localStorage.getItem('score') < score) {
    localStorage.setItem('score', score)
  }
}

// Carregar image
function imageSprite(image) {
  let img = new Image()
  img.src = `../sprites/${image}.png`

  return img
}

// Calcular proporção de imagem
function aspectRatio(originHeight, originWidth, newWidth) {
  return (originHeight / originWidth) * newWidth
}

// Adicionar pontos e audio pela morte do tipo de zumbis
function addPointsAndSoundPerZombie(typeZombie) {
  score += typeZombie.point
  typeZombie.audio.currentTime = 0
  typeZombie.audio.play()
}

// Spawn de zombis, exceto no safezone do player
function spawnZombies(zombie, typeZombie, timeSpawn) {
  setInterval(() => {
    if (zombies.length < totalZombie) {
      function collideRandom() {
        let x = rand(0, canvas.width)
        let y = rand(0, canvas.height)

        const dist = Math.hypot(player.x - x, player.y - y)

        if (dist < player.safezoneRadius + zombie.radius) {
          collideRandom()
        } else {
          if (zombie.name === typeZombie) {
            zombies.push(
              new Zombie(
                x,
                y,
                zombie.radius,
                zombie.color,
                zombie.speed,
                zombie.eyes,
                zombie.life,
                zombie.name
              )
            )
          }
        }
      }
      collideRandom()
    }
  }, timeSpawn)
}
