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



    // getType: function () {
    //     return this.type
    // }


    // public get_x(){

    //     if(type == spritetype){

    //         return x

    //     }

    // }

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
    public getSprite(x: number, y: number): Sprite{
        return this.boardModel.getSprite(x,y);
    }

}
