import {GameOptionsDTO} from "../../objects/dtos/game-options/game-options.dto";
import {GameOptionsData} from "../../objects/data/game-options/game-options.data";
import {GameOptionsRangeDTO} from "../../objects/dtos/game-options/game-options-range.dto";
import {GameOptionRangeData} from "../../objects/data/game-options/game-option-range.data";

export class DataToDtoConverter {

    public static gameOptions(gameOptions: GameOptionsData): GameOptionsDTO {
        const gameOptionsDTO = new GameOptionsDTO();
        gameOptionsDTO.maxPlayers = gameOptions.maxPlayers;
        gameOptionsDTO.ranges = this.gameOptionsRange(gameOptions.ranges);
        return gameOptionsDTO;
    }

    public static gameOptionsRange(gameOptionsRange: GameOptionRangeData): GameOptionsRangeDTO {
        const gameOptionsRangeDTO = new GameOptionsRangeDTO();
        gameOptionsRangeDTO.nbPlayersChoices = gameOptionsRange.nbPlayersChoices;
        return gameOptionsRangeDTO;
    }
}