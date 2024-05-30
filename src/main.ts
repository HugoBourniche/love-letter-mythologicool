import Phaser from 'phaser'

import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./cst";
import MainScene from "./scenes/MainScene";
import MainMenuScene from "./scenes/MainMenuScene";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [MainMenuScene, MainScene],
}

export default new Phaser.Game(config)

