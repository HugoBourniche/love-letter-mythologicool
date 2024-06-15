import { GameOptionsDTO } from "../../objects/dtos/game/options/game-options.dto";
import { GameOptionsData } from "../../objects/data/game-options/game-options.data";
import { GameOptionsRangeDTO } from "../../objects/dtos/game/options/game-options-range.dto";
import { GameOptionRangeData } from "../../objects/data/game-options/game-option-range.data";
import { UserData } from "../../objects/data/users/user.data";
import { UserDTO } from "../../objects/dtos/users/userDTO";

export class DataToDtoConverter {
  // *****************************************************************************************************************
  // USER CONVERTERS
  // *****************************************************************************************************************

  public static users(users: UserData[]): UserDTO[] {
    const usersDTO = [];
    for (const user of users) {
      usersDTO.push(this.user(user));
    }
    return usersDTO;
  }

  public static user(user: UserData): UserDTO {
    const userDTO = new UserDTO();
    userDTO.name = user.name;
    return userDTO;
  }

  // *****************************************************************************************************************
  // GAME OPTIONS CONVERTERS
  // *****************************************************************************************************************

  public static gameOptions(gameOptions: GameOptionsData): GameOptionsDTO {
    const gameOptionsDTO = new GameOptionsDTO();
    gameOptionsDTO.maxPlayers = gameOptions.maxPlayers;
    gameOptionsDTO.ranges = this.gameOptionsRange(gameOptions.ranges);
    return gameOptionsDTO;
  }

  public static gameOptionsRange(
    gameOptionsRange: GameOptionRangeData
  ): GameOptionsRangeDTO {
    const gameOptionsRangeDTO = new GameOptionsRangeDTO();
    gameOptionsRangeDTO.nbPlayersChoices = gameOptionsRange.nbPlayersChoices;
    return gameOptionsRangeDTO;
  }
}
