import { Board, Level } from "./Board";
import { SpriteTypes } from "./Sprites";
import { View } from "./view";


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
}


export class Model {

    views: Array<View> = [];
    sprites: Array<Sprite> = [];
    boardModel: Board;

    constructor(private level: Level){
        this.boardModel = new Board(this.level.levelString);
        console.log(this.boardModel);
        
    }

    public addView(view: View){
        this.views.push(view);
    }

    public addSprite(sprite: Sprite, x: number, y: number){
        this.boardModel.addSprite(sprite, x, y);
    }
    

}
