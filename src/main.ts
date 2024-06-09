import Phaser from 'phaser'

import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./cst";
import MainScene from "./scenes/main.scene";
import MainMenuScene from "./scenes/main-menu.scene";
import LobbyScene from "./scenes/lobby.scene";

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
	scene: [MainMenuScene, LobbyScene, MainScene],
}

export default new Phaser.Game(config)

