import {LobbyData} from "../../objects/data/lobby.data";
import {LobbyUserData} from "../../objects/data/users/lobby-user.data";
import {GameOptionsData} from "../../objects/data/game-options/game-options.data";
import {GameOptionRangeData} from "../../objects/data/game-options/game-option-range.data";

export class DataFactory {

    public static defaultLobbyData(): LobbyData {

        const user1 = new LobbyUserData();
        user1.name = "Théo";
        user1.isReady = true;
        user1.isOwner = true;
        const user2 = new LobbyUserData();
        user2.name = "Mélanie";
        user2.isReady = false;
        user2.isOwner = false;
        const user3 = new LobbyUserData();
        user3.name = "Thomas";
        user3.isReady = true;
        user3.isOwner = false;
        const user4 = new LobbyUserData();
        user4.name = "Hugo";
        user4.isReady = false;
        user4.isOwner = false;

        const gameOptionRange = new GameOptionRangeData();
        gameOptionRange.nbPlayersChoices = ["2", "3", "4", "5", "6"];

        const gameOption = new GameOptionsData();
        gameOption.maxPlayers = 6;
        gameOption.ranges = gameOptionRange;

        const lobbyData = new LobbyData();
        lobbyData.key = "FAB-IEN";
        lobbyData.users = [user1, user2, user3, user4];
        lobbyData.options = gameOption;

        return lobbyData;
    }
}