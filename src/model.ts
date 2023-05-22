import { Board, Level } from "./Board";
import { SpriteTypes } from "./Sprites";
import { View, ViewState } from "./view";


interface ViewOBJ{};

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
    z?: number;
}


export class Model {

    private views: Array<View> = [];
    private sprites: Array<Sprite> = [];
    private boardModel: Board | undefined;
    private level: Level | undefined;
    private currentPlayer = SpriteTypes.BABA;
    constructor(private viewState: ViewState){}

    public addView(view: View){
        this.views.push(view);
    }

    public addSprite(sprite: Sprite, x: number, y: number){
        if (this.boardModel) {
            this.boardModel.addSprite(sprite, x, y);

        }
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

    public getBoard() {
        return this.boardModel?.boardCopy;
    }

    public getPlayer(){
        return this.boardModel?.getPlayer(this.currentPlayer);
    }
}
