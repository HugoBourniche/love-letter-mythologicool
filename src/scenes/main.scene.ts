import Phaser from "phaser";
import {DealerService} from "../services/dealer.service";
import {ZoneService} from "../services/zone.service";
import {PreloadService} from "../services/preload.service";
import Zone from "../objects/zone";

export default class MainScene extends Phaser.Scene {

    private text: Phaser.GameObjects.Text | undefined;
    private zone: Zone | undefined;

    private dealerService: DealerService;
    private zoneService: ZoneService;
    private preloadService: PreloadService;

    constructor() {
        super("main-scene");
        this.dealerService = new DealerService(this);
        this.zoneService = new ZoneService();
        this.preloadService = new PreloadService(this);
    }

    preload() {
        this.preloadService.loadBaseImages();
    }

    create() {
        const self = this;
        this.text = this.add.text(75, 350,['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        this.text.on('pointerdown', () => this.dealerService.dealCards())
        this.text.on('pointerover', function () {
            self.text?.setColor("#ff69b4");
        });
        this.text.on('pointerout', function () {
            self.text?.setColor("#00ffff");
        });

        this.input.on('drag',
            (pointer: Phaser.Input.Pointer, gameObject: any, dragX: number, dragY: number) =>
                this.handleDrag(pointer, gameObject, dragX, dragY)
        );

        this.zone = new Zone(this);
        this.zone.renderZone();
        this.zone.renderOutline();

        this.input.on('dragstart', function (pointer: Phaser.Input.Pointer, gameObject: any) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer: Phaser.Input.Pointer, gameObject: any, dropped: boolean) {
            // Drop not in zone
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dropZone: Phaser.GameObjects.Zone) {
            // Drop in zone
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
        })
    }

  update(time: number, delta: number) {}

    handleDrag(pointer: Phaser.Input.Pointer, gameObject: any, dragX: number, dragY: number) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    }

}
