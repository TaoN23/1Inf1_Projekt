import { Level } from './Board';
import { Model } from './model'
import {Sprite} from './model';
import { Keys, View, ViewState } from './view';

const firstLevel: Level = {
    meta: {
        height: 5,
        width: 10,
    },
    levelString: [
        'wwwwwwwwww',
        'w###w####w',
        'w##w[#b][#b]###w',
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
        const currentPlayer = this.model.getPlayer();

        switch (key) {
            case Keys.KEY_UP:
                currentPlayer?.forEach((sprite) => {
                    console.log(sprite);
                    
                  const up = this.getUp(sprite.x, sprite.y);  
                  console.log(up);
                  if (up === undefined) {
                    console.log(up);
                    
                    return;
                  }

                  if (up.type != this.model.currentStop) {
                      this.model.prepareMove(sprite, up.x, up.y);
                  }

                })  

                break;

        
            case Keys.KEY_DOWN:

            currentPlayer?.forEach((sprite) => {
                console.log(sprite);
                
              const down = this.getDown(sprite.x, sprite.y);  
              console.log(down);
              if (down === undefined) {
                console.log(down);
                
                return;
              }

              if (down.type != this.model.currentStop) {
                  this.model.prepareMove(sprite, down.x, down.y);
              }

            })  

                break;


            case Keys.KEY_LEFT:

            currentPlayer?.forEach((sprite) => {
                console.log(sprite);
                
              const left = this.getLeft(sprite.x, sprite.y);  
              console.log(left);
              if (left === undefined) {
                console.log(left);
                
                return;
              }

              if (left.type != this.model.currentStop) {
                  this.model.prepareMove(sprite, left.x, left.y);
              }

            })  

                break;


            case Keys.KEY_RIGHT:

                currentPlayer?.forEach((sprite) => {
                    console.log(sprite);
                    
                  const right = this.getRight(sprite.x, sprite.y);  
                  console.log(right);
                  if (right === undefined) {
                    console.log(right);
                    
                    return;
                  }
    
                  if (right.type != this.model.currentStop) {
                      this.model.prepareMove(sprite, right.x, right.y);
                  }
    
                })  
    
                    break;

        }

        this.model.move();
    }

    
    public getRight(x: number, y: number, z?: number): Sprite | undefined{
       const newX = x+1;
       const newY = y;

       if (x === this.currentLevel.meta.width) {
            return undefined;
       }

       return this.model.getSprite(newX, newY);
    }
    
    public getLeft(x: number, y: number, z?: number): Sprite | undefined{
       const newX = x-1;
       const newY = y;

       if (x  < 0) {
            return undefined;
       }

       return this.model.getSprite(newX, newY);
    }

    public getDown(x: number, y: number, z?: number): Sprite | undefined{
       const newX = x;
       const newY = y + 1;

       if (y === this.currentLevel.meta.height) {
            console.log("y");
            
            return undefined;
       }

       return this.model.getSprite(newX, newY);
    }
    public getUp(x: number, y: number, z?: number): Sprite | undefined{
       const newX = x;
       const newY = y - 1;
        console.log(newY);
        
       if (newY < 0) {
            return undefined;
       }

       return this.model.getSprite(newX, newY);
    }

}