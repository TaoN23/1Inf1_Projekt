import { Board, Level } from "./Board";
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

    private views: Array<View> = [];
    private boardModel: Board | undefined;
    private level: Level | undefined;
    private currentPlayer = SpriteTypes.BABA;
    //@ts-expect-error
    private currentStop: SpriteTypes | null ;
    private currentWin = SpriteTypes.FLAG;
    private moveList: Array<movelistItem> = []

    constructor(private viewState: ViewState){}

    public addView(view: View){
        this.views.push(view);
    }

    public addSprite(sprite: ViewOBJ, x: number, y: number){
        if (this.boardModel) {
            this.boardModel.addSprite(sprite, x, y);
        }
    }

    public getSprite(x: number, y: number): Sprite | undefined{
        console.log('gs');
        
        return this.boardModel!.getSprite(x,y);
    }

    public changeViewState(newState: ViewState): void{
        if (this.viewState === newState) {
            return;
        }

        this.viewState = newState;
        
        this.views.forEach((view: View) => {
            view.stateChange();
        })
    }

    public loadLevel(level: Level, spriteSize: number){
        this.boardModel = new Board(level.levelString, spriteSize);
        this.level = level; 
    }

    public getViewState(): ViewState{
        return this.viewState;
    }

    public getLevelMeta(){
        if (this.level) {
            return this.level.meta;
        }
        throw new Error("");
        
    }

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
     * move
     */
    public move() {
        this.moveList.forEach((item) => {
            item.sprite.reference?.move(item.newX, item.newY);
        })
        this.moveList = [];
        
    }

    public getBoard() {
        return this.boardModel?.boardCopy;
    }

    public getPlayer(){
        return this.boardModel?.getPlayer(this.currentPlayer);
    }

    /**
     * getPLayer
     */
    public getCurrentPlayer() {
        return this.currentPlayer;
    }

    public setCurrentPlayer(newPlayer: SpriteTypes){
        this.currentPlayer = newPlayer;
        console.log('currentP:');
        
        console.log(this.currentPlayer);
        
    }

    public setCurrentStop(newStop: SpriteTypes | null){
        this.currentStop = newStop;
        console.log('currentS:');

        console.log(this.currentStop);

    }

    public setCurrentWin(newWin: SpriteTypes){
        this.currentWin = newWin;
        console.log('currentW:')

        console.log(this.currentWin);

    }

    public getCurrentWin(){
        return this.currentWin;
    }

    public getIs(){
        return this.boardModel?.getIs();
    }
}
