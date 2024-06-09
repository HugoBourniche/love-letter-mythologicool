import {UserData} from "../objects/data/users/user.data";
import {LobbyCreationRequest} from "../objects/requests/lobby-creation.request";
import {LobbyCreationResponse} from "../objects/responses/lobby-creation.response";
import {UserDataDto} from "../objects/dtos/user-data.dto";
import {LobbyJoinedRequest} from "../objects/requests/lobby-joined.request";
import {LobbyJoinedResponse} from "../objects/responses/lobby-joined.response";

export class LobbyService {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor() {}

    // *****************************************************************************************************************
    // PUBLIC METHODS
    // *****************************************************************************************************************

    public async createLobby(username: string): Promise<LobbyCreationResponse> {
        console.log("LobbyService:createLobby(" + username + ")");
        const user = new UserDataDto(username);
        const requestBody = new LobbyCreationRequest(user);
        const response = await fetch(
            'http://localhost:9143/lobby/create', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Can\'t create a room')
        }

        return (await response.json()) as LobbyCreationResponse;
    }

    public async joinLobby(username: string, lobbyKey: string) {
        console.log("LobbyService:joinLobby(username=" + username + ", lobbyKey="+ lobbyKey +")");
        const user = new UserDataDto(username);
        const requestBody = new LobbyJoinedRequest(user, lobbyKey);
        const response = await fetch(
            'http://localhost:9143/lobby/join', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Can\'t join a room')
        }

        return (await response.json()) as LobbyJoinedResponse;
    }
}