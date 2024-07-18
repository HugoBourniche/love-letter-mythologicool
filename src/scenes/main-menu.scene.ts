import Phaser from "phaser";
import { PreloadService } from "../services/preload.service";
import { TextInputFieldObject } from "../gameobjects/forms/text-input-field.object";
import { ServicesFactory } from "../utils/factories/services.factory";
import { LobbyService } from "../services/lobby.service";
import { LabelledButtonObject } from "../gameobjects/forms/buttons/labelled-button.object";
import { LobbyData } from "../objects/data/lobby.data";
import { LobbyCreationResponse } from "../objects/responses/lobby-creation.response";
import { LobbyJoinedResponse } from "../objects/responses/lobby-joined.response";
import { StoneLabelledButtonObject } from "../gameobjects/forms/buttons/stone-labelled-button.object";
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
  private _nameInputField?: TextInputFieldObject;
  private _keyInputField?: TextInputFieldObject;
  private _joinButton?: LabelledButtonObject;
  private _createButton?: LabelledButtonObject;

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
    this._nameInputField = new TextInputFieldObject(
      this,
      550,
      200,
      "Enter your name..."
    );
    this._createButton = new StoneLabelledButtonObject(
      this,
      550,
      300,
      "Create lobby",
      () => this.createLobby()
    );
    this._keyInputField = new TextInputFieldObject(
      this,
      550,
      400,
      "Enter the lobby key..."
    );
    this._joinButton = new StoneLabelledButtonObject(
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
    if (!this.isValidNameInputField() || this._nameInputField == null) {
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

    if (
      !this.areValidFields() ||
      this._nameInputField == null ||
      this._keyInputField == null
    ) {
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

  // *****************************************************************************************************************
  // UTILS METHODS
  // *****************************************************************************************************************

  private areValidFields(): boolean {
    return this.isValidKeyInputField() && this.isValidNameInputField();
  }

  private isValidKeyInputField(): boolean {
    let isValid = true;
    if (this._keyInputField == null) {
      console.error("_keyInputField is null");
      isValid = false;
    } else if (
      this._keyInputField.value() == "" ||
      this._keyInputField.value() == null
    ) {
      console.error("Key is null");
      isValid = false;
    }
    return isValid;
  }

  private isValidNameInputField(): boolean {
    let isValid = true;
    if (this._nameInputField == null) {
      console.error("_inputField is null");
      isValid = false;
    } else if (
      this._nameInputField.value() == "" ||
      this._nameInputField.value() == null
    ) {
      console.error("name is null");
      isValid = false;
    }
    return isValid;
  }
}
