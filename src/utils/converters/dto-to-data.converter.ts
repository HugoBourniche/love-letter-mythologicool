import {LobbyDTO} from "../../objects/dtos/lobby.dto";
import {LobbyData} from "../../objects/data/lobby.data";
import {LobbyUserDTO} from "../../objects/dtos/users/lobby-user.dto";
import {LobbyUserData} from "../../objects/data/users/lobby-user.data";
import {GameOptionsDTO} from "../../objects/dtos/game-options/game-options.dto";
import {GameOptionsData} from "../../objects/data/game-options/game-options.data";
import {GameOptionsRangeDTO} from "../../objects/dtos/game-options/game-options-range.dto";
import {GameOptionRangeData} from "../../objects/data/game-options/game-option-range.data";

export class DtoToDataConverter {

    public static lobby(lobbyDTO: LobbyDTO): LobbyData {
        const lobby: LobbyData = new LobbyData();
        lobby.key = lobbyDTO.key;
        lobby.users = this.lobbyUsers(lobbyDTO.users);
        lobby.options = this.gameOptions(lobbyDTO.options);
        return lobby;
    }

    public static lobbyUsers(usersDTO: LobbyUserDTO[]): LobbyUserData[] {
        const users: LobbyUserData[] = [];
        for (const userDTO of usersDTO) {
            users.push(this.lobbyUser(userDTO))
        }
        return users;
    }

    public static lobbyUser(userDTO: LobbyUserDTO): LobbyUserData {
        const user: LobbyUserData = new LobbyUserData();
        user.name = userDTO.name;
        user.isReady = userDTO.ready;
        user.isOwner = userDTO.owner;
        return user;
    }

    public static gameOptions(gameOptionsDTO: GameOptionsDTO): GameOptionsData {
        const gameOptions = new GameOptionsData();
        gameOptions.maxPlayers = gameOptionsDTO.maxPlayers;
        gameOptions.ranges = this.gameOptionsRange(gameOptionsDTO.ranges);
        return gameOptions;
    }

    public static gameOptionsRange(gameOptionsRangeDTO: GameOptionsRangeDTO): GameOptionRangeData {
        const gameOptionsRange = new GameOptionRangeData();
        gameOptionsRange.nbPlayersChoices = gameOptionsRangeDTO.nbPlayersChoices;
        return gameOptionsRange;
    }
}