const zombiesTypes = [
  {
    name: 'normal',
    speed: 2,
    life: 10,
    color: '#9ef799',
    radius: 15,
    eyes: '#fff',
    point: 10,
    audio: setAudio('dead-zombie-normal', 'mp3', 0.2)
  },
  {
    name: 'speed',
    speed: 4, // 6
    life: 20,
    color: '#f00',
    radius: 15,
    eyes: '#0f0',
    point: 20,
    audio: setAudio('dead-zombie-speed', 'mp3', 0.2)
  },
  {
    name: 'hulk',
    speed: 3,
    life: 60,
    color: '#000',
    radius: 20,
    eyes: '#ff0',
    point: 30,
    audio: setAudio('dead-zombie-hulk', 'mp3', 0.2)
  },
  {
    name: 'boss',
    speed: 2,
    life: 1000,
    color: 'purple',
    radius: 50,
    eyes: '#ff0',
    point: 100,
    audio: setAudio('dead-zombie-boss', 'mp3', 0.2)
  },
  {
    name: 'ultra',
    speed: 4,
    life: 10000,
    color: '#ff0',
    radius: 100,
    eyes: '#f00',
    point: 1000,
    audio: setAudio('dead-zombie-ultra', 'mp3', 0.2)
  }
]
