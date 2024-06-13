import { BoxSizes } from "../../gameobjects/BoxSizes";
import { PartScenePositionsEnum } from "./part-scene-positions.enum";

export class PartSceneFactory {
  public static computeBoxSizes(
    position: PartScenePositionsEnum,
    width: number,
    height: number
  ): BoxSizes {
    switch (position) {
      case PartScenePositionsEnum.MID_RIGHT:
        return new BoxSizes(width / 2, 0, width, height);
      default:
        return new BoxSizes(0, 0, width, height);
    }
  }
}
