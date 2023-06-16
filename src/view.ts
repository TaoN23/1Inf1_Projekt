import Phaser from "phaser";
import { Controller } from "./controler";
import { Model, Sprite } from "./model";
import { SpriteTypes } from "./Sprites";
import { Board, ModelBoard } from "./Board";


export class View {
    appRef: HTMLElement | null; //app-mount-point 
    board: ModelBoard | undefined; // Kopie des boards
    spriteSize: number | undefined; //Spritegröße
    game: Phaser.Game | undefined;  // Phaser game
    scene: Phaser.Scene | undefined; // Phaser Scene

    /**
     * Konstruktor der View-Klasse.
     * @param {Model} model Referenz zum Model
     * @param {Controller} controller Referenz zum Controller
     */
    constructor(private model: Model, private controller: Controller){
        this.appRef = document.getElementById('app');
        this.spriteSize = this.controller.calculateSpriteSize()
        if (model.getViewState() === ViewState.START_SCREEN) {
            this.setupStartScreen();
        }
    }
    
    /**
     * Baut das Spielfeld und startet das Spiel
     *  @private 
     *  @returns {void}
     */
    private setupGame(){
        this.board = this.model.getBoard();
    
        if (!this.board) {
            throw new Error("");
        }
        

        // Phaser Game Config
        var config = {
            type: Phaser.AUTO,
            width: this.spriteSize!* this.model.getLevelMeta().width,
            height: this.spriteSize!* this.model.getLevelMeta().height,
            view: this,
            scene: {
              create: create
            }
        };
          
          var game = new Phaser.Game(config);
          const view = this; // View Referenz, für die create() Funktion
        
          function create() {
            // iteriert über den Spielfeld-Tensor und fügt der Scene die entsprechenden Sprites hinzu
            view.board!.forEach((row) => {
                row.forEach((column) => {
                    column.forEach((sprite) => {
                        //@ts-expect-error
                            new ViewOBJ(this, view.spriteSize!, sprite.x, sprite.y, sprite.type, view);
                        })
                    })
                })
          
          }

        // setup der Keyboard listener
        window.addEventListener('keypress', this.notifyController.bind(this));
    }

    /**
     * Rendert den Startscreen
     * @private
     * @returns {void}
     */
    private setupStartScreen(): void{
        this.appRef!.innerHTML = startScreen;
        console.log(this.controller);
        
        // wenn Play button gedrückt wird -> startmethode des controllers aufrufen
        document.getElementById('startGame')!.addEventListener('click', this.controller.startGame.bind(this.controller));
    }

    /**
     * Entfernt den Startscreen und startet das Spiel
     * @public 
     * @returns {void}
     */
    public stateChange(): void{
        console.log(this.model.getViewState());
        
        if (this.model.getViewState() === ViewState.GAME_SCREEN) {
           this.clearView();
           this.setupGame(); 
           return; 
        }
    }

    /**
 * Löscht die View, indem der HTML-Inhalt des appRef-Elements geleert wird.
 * @private
 * @returns {void}
 */
    private clearView(){
        this.appRef!.innerHTML = '';
    }


    /**
 * Benachrichtigt den Controller über ein KeyEvent und gibt die Richtung weiter.
 * @private
 * @param {any} event - Das ausgelöste Ereignis
 * @returns {void}
 */
    private notifyController(event: any){
        const direction = keyMap.get(event.code);
        
        
        if (direction) {
            this.controller.move(direction)
        }
        
    }

    /**
 * Sprites können sich im Model eintragen
 * @public
 * @param {ViewOBJ} sprite - Das hinzuzufügende Objekt
 * @param {number} x - Die x-Koordinate des Sprites
 * @param {number} y - Die y-Koordinate des Sprites
 * @returns {void}
 */
    public addSprite(sprite: ViewOBJ, x: number, y: number): void{
        this.model.addSprite(sprite, x, y);
    }
}


const imageMap = new Map()
imageMap.set(SpriteTypes.VOID, './assets/black-square.png');

export enum ViewState {
        START_SCREEN,
        PAUSE_SCREEN,
        GAME_SCREEN,
    };


const startScreen = '<h1>Startscreen</h1> <button id="startGame">Play</button>'


/**
 * Das ViewOBJ repräsentiert ein Grafikobjekt in der Szene.
 */
export class ViewOBJ {
    sprite: Phaser.GameObjects.Rectangle;

     /**
     * Erzeugt ein ViewOBJ-Objekt.
     * @constructor
     * @param {Phaser.Scene} scene - Die Phaser-Szene
     * @param {number} spriteSize - Die Pixelgröße des Sprites
     * @param {number} x - Die x-Koordinate des Sprites
     * @param {number} y - Die y-Koordinate des Sprites
     * @param {SpriteTypes} type - Der Typ des Sprites
     * @param {View} view - Die Ansicht
     */
    constructor(private scene: Phaser.Scene, private spriteSize: number, x: number, y: number, type: SpriteTypes, private view: View) {
        console.log(this.scene);
        
        //@ts-expect-error
       this.sprite = this.scene.add.rectangle(this.spriteSize* x, this.spriteSize*y, spriteSize, spriteSize, colorMap[type.toString()]);
        this.view.addSprite(this, x, y);
        
        
    }
    
     /**
     * Bewegt das Grafikobjekt zu der neuen Position
     * @public
     * @param {number} x - Die neue x-Koordinate
     * @param {number} y - Die neue y-Koordinate
     * @returns {void}
     */
    public move(x: number, y: number){
        console.log(this.sprite);
        this.scene.children.bringToTop(this.sprite);
        this.sprite.x = this.view.spriteSize!*x;
        this.sprite.y = this.view.spriteSize!*y;
    }
}

/**
 * Das Farbzuordnungsobjekt für Sprite-Typen.
 * @constant
 * @type {object}
 */
const colorMap = {
    'Baba' : 0xcfa378,
    'Void' : 0x0a0a09,
    'Wall' : 0x261503,
    'Flag' : 0xbfaa0a,
    'T_Baba': 0x86945f,
    'Is' : 0xe1eff0,
    'T_You' : 0x6e5e1a,
    'T_Flag' : 0x201d82,
    'T_Win' : 0x29c4c2,
    'T_Stop' : 0xba2326,
    'T_Wall' : 0x58ba23,
}

/**
 * Die verfügbaren Tasten für die Steuerung.
 * @enum {string}
 */
export enum Keys {
    KEY_UP = 'w',
    KEY_DOWN = 's',
    KEY_LEFT = 'a',
    KEY_RIGHT = 'd',
}

/**
 * Die Zuordnung der Tastaturereignisse zu den Steuertasten.
 * @constant
 * @type {Map<string, Keys>}
 */
const keyMap = new Map();

keyMap.set('KeyW', Keys.KEY_UP);
keyMap.set('KeyS', Keys.KEY_DOWN);
keyMap.set('KeyA', Keys.KEY_LEFT);
keyMap.set('KeyD', Keys.KEY_RIGHT);
