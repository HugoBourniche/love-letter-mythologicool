import {GameManagerData} from "../models/GameManagerData";

export class InitializedGameResponse {

    private gameManagerDTO: GameManagerData;

    constructor(gameManagerDTO: GameManagerData) {
        this.gameManagerDTO = gameManagerDTO;
    }

}