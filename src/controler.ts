import { Level } from './Board';
import { Model } from './model'
import { View } from './view';
import {Sprite} from './model';
import { SpriteTypes } from './Sprites';

const firstLevel: Level = {
    meta: {},
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

    constructor() {
        this.levels.push(firstLevel);
        this.model = new Model(this.levels[0]);
        this.view = new View(this.model);

        console.log(this.get_right(3,3))

    };


    public move_right(x: number , y: number , z: number){
    
        this.model.move_right(x,y,z)
    
    }

    public move_left(x: number , y: number , z: number){
    
        this.model.move_left(x,y,z)
    
    }
    
    public move_up(x: number , y: number, z: number){
    
       this.model.move_up(x,y,z)
    
    }
    
    public move_down(x: number , y: number , z: number){
    
        this.model.move_down(x,y,z)
    
    }



    public get_right(x: number, y: number, z?: number){

        if (z) {
            return this.model.get_right(x, y, z) 
        }
                
        return this.model.get_right(x, y)

    }

    public get_left(x: number, y: number, z?: number){

        if (z) {
            return this.model.get_left(x, y, z) 
        }
                
        return this.model.get_left(x, y)
    }

    public get_up(x: number, y: number, z?: number){

        if (z) {
           return this.model.get_up(x, y, z) 
        }
        
       return this.model.get_up(x, y)

    }

    public get_down(x: number, y: number, z?: number){

        if (z) {
           return this.model.get_down(x, y, z) 
        }
        
       return this.model.get_down(x, y)

    }


    public sprite_right(spritetype: SpriteTypes){

        this.model.sprite_right(spritetype)

    }


}
