import { View } from "./view";

export interface Board{
    addSprite(sprite: Sprite, x: number, y: number): Function;
}
interface Sprite {}


export class Model {

    views: Array<View> = [];
    sprites: Array<Sprite> = [];

    constructor(private board: Board){

    }

    public addView(view: View){
        this.views.push(view);
    }

    public addSprite(sprite: Sprite, x: number, y: number){
        this.board.addSprite(sprite, x, y);
    }
    

}
