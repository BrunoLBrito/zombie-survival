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
