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


export class Model {

    private views: Array<View> = [];
    private sprites: Array<Sprite> = [];
    private boardModel: Board | undefined;
    private level: Level | undefined;
    private currentPlayer = SpriteTypes.BABA;
    currentStop = SpriteTypes.WALL;
    private moveList: Array<Sprite> = []
    constructor(private viewState: ViewState){}

    public addView(view: View){
        this.views.push(view);
    }

    public addSprite(sprite: Sprite, x: number, y: number){
        if (this.boardModel) {
            this.boardModel.addSprite(sprite, x, y);

        }
    }




/*
    public get_right(x: number, y: number, z?: number){

        if(z){

           return this.boardModel.getter(x++, y, z)

        }

       return this.boardModel.getter(x++,y)

    }

    public get_left(x: number, y: number, z?: number){

        if(z){

           return this.boardModel.getter(x--, y, z)

        }

       return this.boardModel.getter(x--,y)

    }

    public get_up(x: number, y: number, z?: number){

        if(z){

           return this.boardModel.getter(x, y--, z)

        }

       return this.boardModel.getter(x,y--)

    }

    public get_down(x: number, y: number, z?: number){

        if(z){

           return this.boardModel.getter(x, y++, z)

        }

       return this.boardModel.getter(x,y++)

    }


    public sprite_right(spritetype: SpriteTypes){

        if(spritetype==this.sprites.)
        
        
        
        
        this.boardModel.getter(sprite.get_x(spritetype))

    }
*/
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
        this.moveList.push(sprite);

        this.boardModel?.setSprite({...sprite}, newX, newY)
        this.boardModel?.deleteSprite(sprite.x, sprite.y);
        console.log(this.moveList);
        
    }

    public getBoard() {
        return this.boardModel?.boardCopy;
    }

    public getPlayer(){
        return this.boardModel?.getPlayer(this.currentPlayer);
    }
}
