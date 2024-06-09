import {UserData} from "../objects/data/users/user.data";
import {LobbyCreationRequest} from "../objects/requests/lobby-creation.request";
import {LobbyCreationResponse} from "../objects/responses/lobby-creation.response";
import {UserDataDto} from "../objects/dtos/user-data.dto";

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

    public async createLobby(username: string) {
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
        )

        if (!response.ok) {
            throw new Error('Can\'t create a room')
        }

        return (await response.json()) as LobbyCreationResponse;
    }
}