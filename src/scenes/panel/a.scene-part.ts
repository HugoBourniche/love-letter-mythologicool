import { ScenePartPanel } from "../../gameobjects/scene-part.panel";
import Phaser from "phaser";
import { ScenePartPanelPositionsEnum } from "../../utils/Factories/scene-part-panel-positions.enum";
import { PartSceneFactory } from "../../utils/Factories/part-scene.factory";

export abstract class AScenePart {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  protected _context: Phaser.Scene;

  // OBJECTS
  protected _box?: ScenePartPanel;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(context: Phaser.Scene) {
    this._context = context;
  }

  // *****************************************************************************************************************
  // PHASER LIFE CYCLE
  // *****************************************************************************************************************

  protected baseInit(position: ScenePartPanelPositionsEnum) {
    this._box = PartSceneFactory.computeScenePartPanelPositions(
      position,
      this._context.game.config.width as number,
      this._context.game.config.height as number
    );
  }
}
