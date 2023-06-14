import { Level } from './Board';
import { SpriteTextObjectTypes, SpriteTypes, SpriteTextVerbObjectTypes, SpriteTextToSprite, moveAble } from './Sprites';
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
        '#[#k][#i][#y]##w####w',
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

    private checkUpRecursive(spritex: number, spritey: number): Array<Array<number>> {
        const up = this.getUp(spritex, spritey);

        if (up === undefined || up.type === this.model.getCurrentStop()) {
            return [[-1]];
        }

        if (up.type === this.model.getCurrentPLayer() || moveAble.hasOwnProperty(up.type.toString())) {
            return [...this.checkUpRecursive(up.x, up.y), [spritex, spritey]];
        }

        return [[spritex, spritey]]


    }

    private checkDownRecursive(spritex: number, spritey: number): Array<Array<number>> {
        const down = this.getDown(spritex, spritey);

        if (down === undefined || down.type === this.model.getCurrentStop()) {
            return [[-1]];
        }

        if (down.type === this.model.getCurrentPLayer() || moveAble.hasOwnProperty(down.type.toString())) {
            return [...this.checkDownRecursive(down.x, down.y), [spritex, spritey]];
        }

        return [[spritex, spritey]]


    }

    private checkLeftRecursive(spritex: number, spritey: number): Array<Array<number>> {
        const left = this.getLeft(spritex, spritey);

        if (left === undefined || left.type === this.model.getCurrentStop()) {
            return [[-1]];
        }

        if (left.type === this.model.getCurrentPLayer() || moveAble.hasOwnProperty(left.type.toString())) {
            return [...this.checkLeftRecursive(left.x, left.y), [spritex, spritey]];
        }

        return [[spritex, spritey]]


    }
    private checkRightRecursive(spritex: number, spritey: number): Array<Array<number>> {
        const right = this.getRight(spritex, spritey);

        if (right === undefined || right.type === this.model.getCurrentStop()) {
            return [[-1]];
        }

        if (right.type === this.model.getCurrentPLayer() || moveAble.hasOwnProperty(right.type.toString())) {
            return [...this.checkRightRecursive(right.x, right.y), [spritex, spritey]];
        }

        return [[spritex, spritey]]


    }


    public move(key: Keys){
        this.updateLogic();
        const currentPlayer = this.model.getPlayer();

        switch (key) {
            case Keys.KEY_UP:
                currentPlayer?.forEach((sprite) => {
                    const checked = this.checkUpRecursive(sprite.x, sprite.y);
                    if (checked[0][0] === -1) {
                        return;
                    }
                    for (const localSprite of checked) {
                        const up = this.getUp(localSprite[0], localSprite[1]);
                        this.model.prepareMove(this.model.getSprite(localSprite[0], localSprite[1])!, up!.x, up!.y);
                    }

                })  

                break;

        
            case Keys.KEY_DOWN:

            currentPlayer?.forEach((sprite) => {
                const checked = this.checkDownRecursive(sprite.x, sprite.y);
                    
                if (checked[0][0] === -1) {
                    return;
                }
                for (const localSprite of checked) {
                    const down = this.getDown(localSprite[0], localSprite[1]);
                    this.model.prepareMove(this.model.getSprite(localSprite[0], localSprite[1])!, down!.x, down!.y);
                }

            })  

                break;


            case Keys.KEY_LEFT:

            currentPlayer?.forEach((sprite) => {
                const checked = this.checkLeftRecursive(sprite.x, sprite.y);
                
                console.log(checked);
                    
                if (checked[0][0] === -1) {
                    return;
                }
                for (const localSprite of checked) {
                    const left = this.getLeft(localSprite[0], localSprite[1]);
                    console.log(left);
                    
                    this.model.prepareMove(this.model.getSprite(localSprite[0], localSprite[1])!, left!.x, left!.y);
                }
            })  

                break;


            case Keys.KEY_RIGHT:

                currentPlayer?.forEach((sprite) => {
                    const checked = this.checkRightRecursive(sprite.x, sprite.y);
                    
                    if (checked[0][0] === -1) {
                        return;
                    }
                    for (const localSprite of checked) {
                        const right = this.getRight(localSprite[0], localSprite[1]);
                        this.model.prepareMove(this.model.getSprite(localSprite[0], localSprite[1])!, right!.x, right!.y);
                    }
    
                })  
    
                    break;

        }

        this.model.move();
    }




    private setNewRules(sprite1: Sprite | undefined, sprite2: Sprite | undefined) : void {
        if (sprite1) {    
            if (Object.values(SpriteTextObjectTypes).includes(sprite1.type) ) {

                    if (sprite2) {
                        
                        if (Object.values(SpriteTextVerbObjectTypes).includes(sprite2.type)) {
                            const foo: any = {
                                'T_You' : (newPlayer: SpriteTypes) => {
                                    this.model.setCurrentPlayer(newPlayer);
                                },

                                'T_Stop' : (newStop: SpriteTypes) => {
                                    this.model.setCurrentStop(newStop);
                                },

                                'T_Win' : (newWin: SpriteTypes) => {
                                    this.model.setCurrentWin(newWin);
                                },
                            };

                            foo[sprite2.type.toString()](SpriteTextToSprite[sprite1.type.toString()]);
                        }
                        
                    }
                }
        }
    }

    private updateLogic(){
        const is = this.model.getIs();

        is?.forEach((is: Sprite) => {
            console.log(is);
            

            const left: Sprite | undefined = this.getLeft(is.x, is.y);
            const right: Sprite | undefined = this.getRight(is.x, is.y);
            
            this.setNewRules(left, right);
                

            const up: Sprite | undefined = this.getLeft(is.x, is.y)
            const down: Sprite | undefined = this.getLeft(is.x, is.y)

            this.setNewRules(up, down);

            
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

       if (newX  < 0) {
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