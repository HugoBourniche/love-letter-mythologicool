import Phaser from "phaser";
import { PreloadService } from "../services/preload.service";
import { TextInputField } from "../gameobjects/forms/text-input.field";
import { ServicesFactory } from "../utils/factories/services.factory";
import { LobbyService } from "../services/lobby.service";
import { LabelledButtonField } from "../gameobjects/forms/buttons/labelled-button.field";
import { LobbyData } from "../objects/data/lobby.data";
import { LobbyCreationResponse } from "../objects/responses/lobby-creation.response";
import { LobbyJoinedResponse } from "../objects/responses/lobby-joined.response";
import { StoneLabelledButtonField } from "../gameobjects/forms/buttons/stone-labelled-button.field";
import { LobbySceneData } from "../objects/data/lobby-scene.data";
import { DtoToDataConverter } from "../utils/converters/dto-to-data.converter";

export default class MainMenuScene extends Phaser.Scene {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // Services
  private _preloadService: PreloadService;
  private _lobbyService: LobbyService;

  // Objects
  private _nameInputField?: TextInputField;
  private _keyInputField?: TextInputField;
  private _joinButton?: LabelledButtonField;
  private _createButton?: LabelledButtonField;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super("main-menu-scene");
    this._preloadService = ServicesFactory.Preload(this);
    this._lobbyService = ServicesFactory.Lobby();
  }

  // *****************************************************************************************************************
  // PHASER LIFECYCLE
  // *****************************************************************************************************************

  preload() {
    this._preloadService.loadMainMenuImages();
    this._preloadService.loadLoveLetterClassicPresetImages();
  }

  create() {
    this.input.keyboard?.createCursorKeys();

    // Initiate form and input field
    this._nameInputField = new TextInputField(
      this,
      550,
      200,
      "Enter your name..."
    );
    this._createButton = new StoneLabelledButtonField(
      this,
      550,
      300,
      "Create lobby",
      () => this.createLobby()
    );
    this._keyInputField = new TextInputField(
      this,
      550,
      400,
      "Enter the lobby key..."
    );
    this._joinButton = new StoneLabelledButtonField(
      this,
      550,
      500,
      "Join lobby",
      () => this.joinLobby()
    );
  }

  update() {
    this._nameInputField?.update();
    this._keyInputField?.update();
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  // Button events

  private createLobby() {
    if (this._nameInputField == null) {
      console.error("_inputField is null");
      return;
    } else if (
      this._nameInputField.value() == "" ||
      this._nameInputField.value() == null
    ) {
      console.error("name is null");
      return;
    }
    this._lobbyService
      .createLobby(this._nameInputField.value())
      .then((response: LobbyCreationResponse) =>
        this.onLobbyCreatedOrJoined(
          DtoToDataConverter.lobby(response.lobby),
          response.currentUserName
        )
      )
      .catch((error) => console.error(error));
  }

  private joinLobby() {
    console.log("Join lobby");
    if (this._keyInputField == null) {
      console.error("_keyInputField is null");
      return;
    } else if (
      this._keyInputField.value() == "" ||
      this._keyInputField.value() == null
    ) {
      console.error("Key is null");
    }
    if (this._nameInputField == null) {
      console.error("_inputField is null");
      return;
    } else if (
      this._nameInputField.value() == "" ||
      this._nameInputField.value() == null
    ) {
      console.error("name is null");
      return;
    }

    this._lobbyService
      .joinLobby(this._nameInputField.value(), this._keyInputField.value())
      .then((response: LobbyJoinedResponse) =>
        this.onLobbyCreatedOrJoined(
          DtoToDataConverter.lobby(response.lobby),
          response.currentUserName
        )
      );
  }

  private onLobbyCreatedOrJoined(lobbyData: LobbyData, username: string) {
    console.log("Key: " + lobbyData.key);
    this.scene.start("lobby-scene", new LobbySceneData(lobbyData, username));
  }
}
