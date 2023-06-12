import { Level } from './Board';
import { SpriteTextObjectTypes, SpriteTypes, SpriteTextVerbObjectTypes, SpriteTextToSprite } from './Sprites';
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
        'w[#k][#i][#y]##w####w',
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
        this.updateLogic();
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

                  if (up.type != this.model.getCurrentStop()) {
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

              if (down.type != this.model.getCurrentStop()) {
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

              if (left.type != this.model.getCurrentStop()) {
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
    
                  if (right.type != this.model.getCurrentStop()) {
                      this.model.prepareMove(sprite, right.x, right.y);
                  }
    
                })  
    
                    break;

        }

        this.model.move();
    }

    private updateLogic(){
        const is = this.model.getIs();

        is?.forEach((is: Sprite) => {
            console.log(is);
            

            const left: Sprite | undefined = this.getLeft(is.x, is.y);
            
            if (left) {
                console.log('is');
                
            if (Object.values(SpriteTextObjectTypes).includes(left.type) ) {
                    const right : Sprite | undefined = this.getRight(is.x, is.y);

                    if (right) {
                        
                        if (Object.values(SpriteTextVerbObjectTypes).includes(right.type)) {
                            const foo: any = {
                                'T_You' : (newPlayer: SpriteTypes) => {
                                    this.model.setCurrentPlayer(newPlayer);
                                }
                            };

                            foo[right.type.toString()](SpriteTextToSprite[left.type.toString()]);
                        }
                        
                    }
                }
            }
                

            const up: Sprite | undefined = this.getLeft(is.x, is.y)

            if (up){
                
                if (Object.values(SpriteTextObjectTypes).includes(up.type) ){
                    
                    const down : Sprite | undefined = this.getDown(is.x, is.y)

                    if(down) {
                        
                        if(Object.values(SpriteTextVerbObjectTypes).includes(down.type)){
                            const foo: any = {
                                'T_You' : (newPlayer: SpriteTypes) => {console.log(newPlayer);
                                }
                            };
                        
                            foo[down.type.toString()](SpriteTextToSprite[up.type.toString()])


                            
                            

                        }
                        
                    }
                    
                
                }


                
            }



            


            
        })
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