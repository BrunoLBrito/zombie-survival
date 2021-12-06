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
    bulletSize: 100, // 2
    capacity: 15,
    inMag: 15,
    reloadTime: 2.0,
    ammo: 9999, // default 50
    image: imageSprite('weapon_pistol')
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
    rate: 1.3,
    inaccuracy: 0.2,
    bulletSize: 100, // 3
    capacity: 6,
    inMag: 6,
    reloadTime: 2.0,
    ammo: 9999, // default 30
    image: imageSprite('weapon_shotgun')
  },
  {
    name: 'uzi',
    color: '#000',
    width: 25,
    height: 15,
    spray: 2, // 2
    damage: 20,
    audio: setAudio('uzi', 'mp3', 0.1),
    autofire: true,
    rate: 0.05,
    inaccuracy: 0.2,
    bulletSize: 100, // 3
    capacity: 2000, // 50
    inMag: 50,
    reloadTime: 2.0,
    ammo: 9999, // default 200
    image: imageSprite('weapon_uzi')
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
    inaccuracy: 0.0,
    bulletSize: 300, // 20
    capacity: 1,
    inMag: 1,
    reloadTime: 2.0,
    ammo: 9999, // default 5
    image: imageSprite('weapon_rpg')
  }
]
