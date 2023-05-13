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



    public move_right(x: number , y: number, z: number){
    
        if(this.boardModel.check_right(x,y)){
            
            this.boardModel.move_right(x, y, z)
            
        }
    
    }

    public move_left(x: number , y: number, z: number){
    
        if(this.boardModel.check_left(x,y)){
            
            this.boardModel.move_left(x, y, z)
            
        }
    
    }
    
    public move_up(x: number , y: number, z: number){
    
        if(this.boardModel.check_up(x,y)){
            
            this.boardModel.move_up(x, y, z)
            
        }
    
    }
    
    public move_down(x: number , y: number, z: number){
    
        if(this.boardModel.check_down(x,y)){
            
            this.boardModel.move_down(x, y, z)
            
        }
    
    }
    

}
