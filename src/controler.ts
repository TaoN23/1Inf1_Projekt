import { Level } from './Board';
import { Model } from './model'
import {Sprite} from './model';
import { SpriteTypes } from './Sprites';
import { Keys, View, ViewState } from './view';

const firstLevel: Level = {
    meta: {
        height: 5,
        width: 10,
    },
    levelString: [
        'wwwwwwwwww',
        'w########w',
        'w##w[#b]w###w',
        'w########w',
        'wwwwwwwwww',
    ]
}

export class Controller{
  
    private levels: Array<Level> = [];
    private model: Model;
    private view: View;
    private currentLevel : Level

    constructor() {
        this.levels.push(firstLevel);
        this.model = new Model(ViewState.START_SCREEN);
        this.view = new View(this.model, this);
        this.model.addView(this.view);
        this.currentLevel = this.levels[0];
    };

    public startGame(): void{
        document.getElementById('startGame')?.removeEventListener('click', this.startGame);
        
        this.model.changeViewState(ViewState.GAME_SCREEN);
    }

    public calculateSpriteSize(){
        const spriteSize = window.innerWidth / this.currentLevel.meta.width;
        
        if(window.innerHeight - spriteSize * this.currentLevel.meta.height < 0){
            const spriteSize = window.innerHeight / this.currentLevel.meta.height;
            this.model.loadLevel(this.levels[0], spriteSize)
            
            return spriteSize;
        }
        this.model.loadLevel(this.levels[0], spriteSize)
        
        return spriteSize;
    }

    public move(key: Keys){
        console.log(this.model.getPlayer());

        switch (key) {
            case Keys.KEY_UP:
                
                break;
        
            default:
                break;
        }
    }

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
