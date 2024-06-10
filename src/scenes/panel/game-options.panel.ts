import {GameOptionData} from "../../objects/data/gameoptions/game-option.data";
import {BoxSizes} from "../../gameobjects/BoxSizes";
import {PartSceneFactory} from "../../utils/factories/part-scene.factory";
import {PartScenePositionsEnum} from "../../utils/factories/part-scene-positions.enum";
import {SimpleLabelField} from "../../gameobjects/forms/simple-label.field";
import {DEFAULT_STYLE_WHITE} from "../../cst";
import {SelectorField} from "../../gameobjects/forms/selector.field";
import {StoneLabelledButtonField} from "../../gameobjects/forms/buttons/stone-labelled-button.field";
import {LobbyService} from "../../services/lobby.service";
import {ServicesFactory} from "../../utils/factories/services.factory";

export class GameOptionsPanel {


    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // Services
    private lobbyService: LobbyService;

    //
    private _context: Phaser.Scene;
    private _box?: BoxSizes;
    private _gameOptions?: GameOptionData;
    private _lobbyKey?: string;

    private _title?: SimpleLabelField;
    private _playerMax?: SelectorField;
    private _applyButton?: StoneLabelledButtonField;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Phaser.Scene) {
        this._context = context;
        this.lobbyService = ServicesFactory.Lobby();
    }

    // *****************************************************************************************************************
    // PHASER LIFE CYCLE
    // *****************************************************************************************************************

    public init(lobbyKey: string, gameOptions: GameOptionData, position: PartScenePositionsEnum) {
        this._lobbyKey = lobbyKey;
        this._gameOptions = gameOptions;
        this._box = PartSceneFactory.computeBoxSizes(position, this._context.game.config.width as number, this._context.game.config.height as number);
    }

    public preload() {

    }

    public create() {
        if (this._box == null || this._gameOptions == null) {
            return;
        }
        this._context.add.rectangle(this._box.midWidth, this._box.midHeight, this._box.width, this._box.height, 0x222222);
        this._title = new SimpleLabelField(this._context, this._box.x(50), this._box.y(20), "Game Options", DEFAULT_STYLE_WHITE);
        this._playerMax = new SelectorField(this._context, this._box.x(100), this._box.y(60), "Number of players", this._gameOptions.ranges.nbPlayersChoices, DEFAULT_STYLE_WHITE);
        this._applyButton = new StoneLabelledButtonField(this._context, this._box.midWidth, this._box.y(150), "Apply options", () => this.applyOptions());
    }

    public update() {

    }

    // *****************************************************************************************************************
    // PRIVATE METHODS
    // *****************************************************************************************************************

    private applyOptions() {
        console.log("Apply options");
        if (this._gameOptions == null || this._lobbyKey == null) {
            return;
        }
        this._gameOptions.maxPlayers = this._playerMax ? Number.parseInt(this._playerMax.value()) : -1;
        this.lobbyService.applyGameOptions(this._lobbyKey, this._gameOptions).then();
    }
}