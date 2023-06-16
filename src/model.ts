import { Board, Level, ModelBoard } from "./Board";
import { SpriteTypes } from "./Sprites";
import { View, ViewOBJ, ViewState } from "./view";


export interface Sprite {
   
   
   

    // relative Koordinaten im view-model
    x: number;
    y: number;
    // view höhe und breite, müssen berechnet werden
    width_p: number;
    height_p: number;
    // Textur
    type: SpriteTypes;
    // Referenz auf das View Objekt
    reference?: ViewOBJ;
    // getType: function () {
    //     return this.type
    // }


    // public get_x(){

    //     if(type == spritetype){

    //         return x

    //     }

    // }

    z?: number;
}



type movelistItem = {
    sprite: Sprite;
    newX: number;
    newY: number;
}
export class Model {

    private views: Array<View> = []; // Liste der Views
    private boardModel: Board | undefined; // Das Board-Modell
    private level: Level | undefined; // Das Level
    private currentPlayer = SpriteTypes.BABA; // Der aktuelle Spieler
    // @ts-expect-error
    private currentStop: SpriteTypes | null; // Der aktuelle Stop-Typ
    // @ts-expect-error
    private currentWin = SpriteTypes | null; // Der aktuelle Win-Typ
    private moveList: Array<movelistItem> = []; // Liste der Bewegungen


    /**
     * Konstruktor der Model-Klasse.
     * @param {ViewState} viewState - Der Anfangszustand des Views
     */
    constructor(private viewState: ViewState){}

    /**
     * Fügt eine View hinzu.
     * @public
     * @param {View} view - Der hinzuzufügende View
     * @returns {void}
     */
    public addView(view: View){
        this.views.push(view);
    }

     /**
     * Fügt ein Sprite zum Board hinzu.
     * @public
     * @param {ViewOBJ} sprite - Das hinzuzufügende Sprite
     * @param {number} x - Die x-Koordinate des Sprites
     * @param {number} y - Die y-Koordinate des Sprites
     * @returns {void}
     */
    public addSprite(sprite: ViewOBJ, x: number, y: number){
        if (this.boardModel) {
            this.boardModel.addSprite(sprite, x, y);
        }
    }

    /**
     * Gibt das Sprite an den angegebenen Koordinaten zurück.
     * @public
     * @param {number} x - Die x-Koordinate des Sprites
     * @param {number} y - Die y-Koordinate des Sprites
     * @returns {Sprite | undefined} - Das Sprite an den gegebenen Koordinaten
     */
    public getSprite(x: number, y: number): Sprite | undefined{
        console.log('gs');
        
        return this.boardModel!.getSprite(x,y);
    }

    /**
     * Ändert den Zustand der View.
     * @public
     * @param {ViewState} newState - Der neue Zustand der View
     * @returns {void}
     */
    public changeViewState(newState: ViewState): void{
        if (this.viewState === newState) {
            return;
        }

        this.viewState = newState;
        
        this.views.forEach((view: View) => {
            view.stateChange();
        })
    }

    /**
     * Lädt ein neues Level und übergibt die Sprite-Größe.
     * @public
     * @param {Level} level - Das zu ladende Level
     * @param {number} spriteSize - Die Sprite-Größe
     * @returns {void}
     */
    public loadLevel(level: Level, spriteSize: number){
        this.boardModel = new Board(level.levelString, spriteSize);
        this.level = level; 
    }

       /**
     * Gibt den aktuellen Zustand der View zurück.
     * @public
     * @returns {ViewState} - Der aktuelle Zustand der View
     */
       public getViewState(): ViewState {
        return this.viewState;
    }

    /**
     * Gibt die Metadaten des aktuellen Levels zurück.
     * @public
     * @returns {unknown} - Die Metadaten des Levels
     * @throws {Error} - Wird geworfen, wenn kein Level vorhanden ist
     */
    public getLevelMeta(){
        if (this.level) {
            return this.level.meta;
        }
        throw new Error("");
        
    }

      /**
     * Fügt die Bewegungen einem Array hinzu
     * @public
     * @param {Sprite} sprite - Das zu bewegende Sprite
     * @param {number} newX - Die neue x-Koordinate
     * @param {number} newY - Die neue y-Koordinate
     * @returns {void}
     */
    public prepareMove(sprite: Sprite, newX: number, newY: number): void{
        this.moveList.push({sprite, newX, newY});

        this.boardModel?.setSprite({...sprite, x: newX, y: newY}, newX, newY)
        this.boardModel?.deleteSprite(sprite.x, sprite.y);
        console.log(this.moveList);
        
    }

    public getCurrentStop(): SpriteTypes | null {
        return this.currentStop;
    }

     /**
     * Führt die Bewegungen aus.
     * @public
     * @returns {void}
     */
    public move() {
        this.moveList.forEach((item) => {
            item.sprite.reference?.move(item.newX, item.newY);
        })
        this.moveList = [];
        
    }

    /**
     * Gibt das Board zurück.
     * @public
     * @returns {unknown} - Das Board
     */
    public getBoard(): ModelBoard | undefined {
        return this.boardModel?.boardCopy;
    }

    /**
     * Gibt die Spieler-Objekte
     * @public
     * @returns {unknown} - Der aktuelle Spieler
     */
    public getPlayer(): Array<Sprite> {
        return this.boardModel!.getPlayer(this.currentPlayer);
    }

     /**
     * Gibt den aktuellen Spieler zurück.
     * @public
     * @returns {SpriteTypes} - Der aktuelle Spieler
     */
     public getCurrentPlayer(): SpriteTypes {

        return this.currentPlayer;
    }

    /**
     * Setzt den aktuellen Spieler.
     * @public
     * @param {SpriteTypes} newPlayer - Der neue Spieler
     * @returns {void}
     */
    public setCurrentPlayer(newPlayer: SpriteTypes){
        this.currentPlayer = newPlayer;
        console.log('currentP:');
        
        console.log(this.currentPlayer);
        
    }

    /**
     * Gibt den aktuellen Stop-Typ zurück.
     * @public
     * @returns {SpriteTypes | null} - Der aktuelle Stop-Typ
     */
    public setCurrentStop(newStop: SpriteTypes | null){
        this.currentStop = newStop;
        console.log('currentS:');

        console.log(this.currentStop);

    }

    /**
     * Setzt den aktuellen Win-Typ.
     * @public
     * @param {SpriteTypes} newWin - Der neue Win-Typ
     * @returns {void}
     */
    public setCurrentWin(newWin: SpriteTypes | null){
        this.currentWin = newWin;

    }

    public getCurrentWin(){
        return this.currentWin;
    }

    /**
     * Gibt die 'is'-Funktion des Board-Modells zurück.
     * @public
     * @returns {unknown} - Die 'is'-Funktion des Board-Modells
     */
    public getIs(){
        return this.boardModel?.getIs();
    }
}
