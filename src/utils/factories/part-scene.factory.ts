import { ScenePartPanel } from "../../gameobjects/scene-part.panel";
import { ScenePartPanelPositionsEnum } from "./scene-part-panel-positions.enum";

export class PartSceneFactory {
  public static computeScenePartPanelPositions(
    position: ScenePartPanelPositionsEnum,
    width: number,
    height: number
  ): ScenePartPanel {
    switch (position) {
      case ScenePartPanelPositionsEnum.MID_RIGHT:
        return new ScenePartPanel(width / 2, 0, width, height);
      default:
        return new ScenePartPanel(0, 0, width, height);
    }
  }
}
