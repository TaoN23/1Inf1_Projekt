import { Level } from './Board';
import { Model } from './model'
import { View } from './view';
import {Sprite} from './model';
import { SpriteTypes } from './Sprites';

const firstLevel: Level = {
    meta: {
        width: 20,
        height: 5,
    },
    levelString: [
        'wwwwwwwwwwwwwwwwwwww',
        'w#######[#w]########ww',
        'w#######wwww######w',
        'w###[#b]#############w',
        'wwwwwwwwwwwwwwwwwwww',
    ]
}
export class Controller{

    levels: Array<Level> = [];
    model: Model;
    view: View; 
    currentLevel: Level;

    constructor() {
        this.levels.push(firstLevel);
        this.model = new Model(this.levels[0]);
        this.view = new View(this.model);
        this.currentLevel = this.levels[0];
        console.log(this.getUp(3,3))

    };




    public getRight(x: number, y: number, z?: number): Sprite | boolean{
       const newX = x+1;
       const newY = y;

       if (x === this.currentLevel.meta.width) {
            return false;
       }

       return this.model.getSprite(newX, newY);
    }
    
    public getLeft(x: number, y: number, z?: number): Sprite | boolean{
       const newX = x-1;
       const newY = y;

       if (x  < 0) {
            return false;
       }

       return this.model.getSprite(newX, newY);
    }

    public getDown(x: number, y: number, z?: number): Sprite | boolean{
       const newX = x;
       const newY = y + 1;

       if (y === this.currentLevel.meta.height) {
            return false;
       }

       return this.model.getSprite(newX, newY);
    }

    public getUp(x: number, y: number, z?: number): Sprite | boolean{
       const newX = x;
       const newY = y - 1;

       if (y < 0) {
            return false;
       }

       return this.model.getSprite(newX, newY);
    }


}
