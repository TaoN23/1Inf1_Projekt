import { Level } from "./Board";
import { SpriteTypes } from "./Sprites";
import { View } from "./view";

export interface Board{
    addSprite(sprite: Sprite, x: number, y: number): Function;
}

interface ViewOBJ{};

export interface Sprite {
    x: number;
    y: number;
    width_p: number;
    height_p: number;
    type: SpriteTypes;
    reference?: ViewOBJ;
}


export class Model {

    views: Array<View> = [];
    sprites: Array<Sprite> = [];

    constructor(private level: Level){

    }

    public addView(view: View){
        this.views.push(view);
    }

    public addSprite(sprite: Sprite, x: number, y: number){
        this.level.addSprite(sprite, x, y);
    }
    

}
