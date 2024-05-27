import { Player } from "../objects/player";
import {InitializedGameResponse} from "../objects/response/InitializedGameResponse";

export class GameManagerService {

    constructor() {}

    public async initializeGame(player: Player[]) {
        console.log("Initialize Game");
        const response = await fetch(
            'http://localhost:9143/loveletter/classic/initialize', {
                method: 'POST',
                body: JSON.stringify({
                    players: player
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );
        if (!response.ok) {
            throw new Error('Initialize Game');
        }
        return (await response.json()) as InitializedGameResponse;
    }
}