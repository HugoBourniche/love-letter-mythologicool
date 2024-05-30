import Phaser from "phaser";
import {PreloadService} from "../services/preload.service";


export default class MainMenuScene extends Phaser.Scene {

    // Services
    private preloadService: PreloadService;

    constructor() {
        super();
        this.preloadService = new PreloadService(this);
    }

    preload() {
        this.preloadService.loadBackground();
    }

    create() {
        console.log("Create main menu");

        this.add.image(0, 0, "background");
        // const style = new TextStyle();
        const text = this.add.text(0, 0, "Menu");
        text.setColor("#ffff00");
        // For form
        // https://github.com/ErlendKK/Input-form-built-in-Phaser-3.5-with-no-DOM-Element/blob/main/menu.js
        // https://raw.githack.com/ErlendKK/Input-form-with-Phaser-3.5-No-DOM-Elements-/main/index.html
    }
}