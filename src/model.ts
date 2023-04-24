import { View } from "./view";

export interface Board{
    addSprite(sprite: Sprite, x: number, y: number): Function;
}
export interface Sprite {}


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
