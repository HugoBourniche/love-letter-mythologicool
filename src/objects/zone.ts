export default class Zone {
  private context: Phaser.Scene;
  private zone: Phaser.GameObjects.Zone | undefined;

  constructor(scene: Phaser.Scene) {
    this.context = scene;
  }

  public renderZone() {
    this.zone = this.context.add
      .zone(700, 375, 900, 250)
      .setRectangleDropZone(900, 250);
    this.zone.setData({ cards: 0 });
  }

  public renderOutline() {
    const dropZoneOutline = this.context.add.graphics();
    dropZoneOutline.lineStyle(4, 0xff69b4);
    if (this.zone !== undefined && this.zone.input !== null) {
      dropZoneOutline.strokeRect(
        this.zone.x - this.zone.input.hitArea.width / 2,
        this.zone.y - this.zone.input.hitArea.height / 2,
        this.zone.input.hitArea.width,
        this.zone.input.hitArea.height
      );
    }
  }
}
