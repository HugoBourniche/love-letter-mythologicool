import { LobbyCreationRequest } from "../objects/requests/lobby-creation.request";
import { LobbyCreationResponse } from "../objects/responses/lobby-creation.response";
import { LobbyJoinedRequest } from "../objects/requests/lobby-joined.request";
import { LobbyJoinedResponse } from "../objects/responses/lobby-joined.response";
import { LobbyUpdateResponse } from "../objects/responses/lobby-update.response";
import { DataToDtoConverter } from "../utils/converters/data-to-dto.converter";
import { UserDTO } from "../objects/dtos/users/user.dto";
import { GameOptionsData } from "../objects/data/game-options/game-options.data";
import { ApplyGameOptionsRequest } from "../objects/requests/apply-game-options.request";
import { LobbyUserReadyRequest } from "../objects/requests/lobby-user-ready.request";

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
    const user = new UserDTO();
    user.name = username;
    const requestBody = new LobbyCreationRequest(user);
    const response = await fetch("http://localhost:9143/lobby/create", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Can't create a room");
    }

    return (await response.json()) as LobbyCreationResponse;
  }

  public async joinLobby(username: string, lobbyKey: string) {
    console.log(
      "LobbyService:joinLobby(username=" +
        username +
        ", lobbyKey=" +
        lobbyKey +
        ")"
    );
    const user = new UserDTO();
    user.name = username;
    const requestBody = new LobbyJoinedRequest(user, lobbyKey);
    const response = await fetch("http://localhost:9143/lobby/join", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Can't join a room");
    }

    return (await response.json()) as LobbyJoinedResponse;
  }

  public async switchUserReady(key: string, userName: string) {
    console.log(
      "LobbyService:switchUserReady(lobbyKey=" +
        key +
        ", userName=" +
        userName +
        ")"
    );
    const request = new LobbyUserReadyRequest(userName, key);
    const response = await fetch("http://localhost:9143/lobby/ready", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Can't update a room");
    }

    return (await response.json()) as LobbyUpdateResponse;
  }

  public async updateLobby(lobbyKey: string) {
    console.log("LobbyService:updateLobby(lobbyKey=" + lobbyKey + ")");
    const response = await fetch(
      "http://localhost:9143/lobby/update?lobbyKey=" + lobbyKey,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Can't update a room");
    }

    return (await response.json()) as LobbyUpdateResponse;
  }

  public async applyGameOptions(
    lobbyKey: string,
    gameOptions: GameOptionsData
  ) {
    console.log(
      "LobbyService:applyGameOptions(" + gameOptions.maxPlayers + ")"
    );
    const gameOptionsDTO = DataToDtoConverter.gameOptions(gameOptions);
    const requestBody = new ApplyGameOptionsRequest(lobbyKey, gameOptionsDTO);
    const response = await fetch(
      "http://localhost:9143/lobby/apply-game-options",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Can't update game options");
    }
  }
}
