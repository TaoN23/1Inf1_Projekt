import { Sprite } from "./model";
import { SpriteTypes } from "./Sprites";


export interface Level {
    levelString: Array<string>;
    meta: {
        height: number;
        width: number;
    };
}


export type ModelBoard = Array<Array<Array<Sprite>>> ;

export class Board {

    private board: ModelBoard = [];

    constructor(rawBoard: Array<string>, private spriteSize: number) {
        this.parseBoard(rawBoard);
        this.log();
        
    }

     private parseBoard(leveldata: String[] ): void {
        // TODO: Parse Logic 
        //this.board[y][x][length] = {x: 0, y: 0, width: 20, height: 20, type: SpriteTypes.WALL};

            for (let row: number = 0; row < leveldata.length; row++) {
                let delayCounter = 0;

                column_loop:
                for (let column: number = 0; column < leveldata[row].length; column++) {      
                                  
                                       
                    if(leveldata[row].at(column) === '[') {
                        column++;
                        
                        for(let z = 0; true; z++) {
                            delayCounter++;
                            if (leveldata[row].at(column)==']') {
                                
                                continue column_loop;
                                
                            }
                            console.log(leveldata[row].at(column));
                            // @ts-expect-error
                            this.addSpriteData(column - delayCounter, row, this.spriteSize, this.spriteSize, shortcutMap[leveldata[row].at(column)]);
                         
                            column++;

                        }

                    }
                    //@ts-expect-error
                    this.addSpriteData(column - delayCounter, row, this.spriteSize, this.spriteSize, shortcutMap[leveldata[row].at(column)]);
                }

            }
    }

    private addSpriteData(x: number, y: number, width: number, height: number, type: SpriteTypes, z?: number,){
        if (!this.board[y])
            this.board[y] = [];
        if (!this.board[y][x])
            this.board[y][x] = [];
        if (z) {
            this.board[y][x].push({x, y, width_p: width, height_p: height, type, z});    
        }
        this.board[y][x].push({x, y, width_p: width, height_p: height, type});
    }


    // View Objekte können sich eintragen
    public addSprite(sprite: Sprite, x: number, y: number) {
        const length = this.board[y][x].length;
        this.board[y][x][length].reference = sprite;
    }

    public log(){
        let foo = '';
        console.log(JSON.stringify(this.board[1]));
        this.board.forEach((row) => {
            row.forEach((column) => {
                if (column){
                    foo += structuredClone(column).pop().type.toString();
                    
                }
            })
            foo += '\n';
            
        })
        
        console.log(foo);
        

    }

    
    public get boardCopy() : ModelBoard {
        return [...this.board]
    }


    public getPlayer(currentPlayer: SpriteTypes) : Array<Sprite> {
        const player: Array<Sprite> = [];

        this.board.forEach((row) => {
            row.forEach((column) => {
                column.forEach((sprite: Sprite) => {
                    if (sprite.type === currentPlayer) {
                        player.push(sprite);
                    }
                })
            })
        })

        return player;
    }
    

    public getIs(): Array<Sprite>{

        const is: Array<Sprite> = [];

        this.board.forEach((row) => {
            row.forEach((column) => {
                column.forEach((sprite: Sprite) => {
                    if (sprite.type === SpriteTypes.IS) {
                        is.push(sprite);
                    }
                })
            })
        })

        return is;

        
    }
    


    public getSprite(x: number , y: number): Sprite | undefined{
        
        return this.board[y][x].findLast((i) => i,);
    }


    public setSprite(sprite: Sprite, x:number, y: number){
        
        this.board[y][x].push(sprite);

    }

    /**
     * deleteSprite
     */
    public deleteSprite(x: number, y: number) {
        this.board[y][x].pop();
        this.log();
    }



}

const shortcutMap = {
    '#': SpriteTypes.VOID,
    'b': SpriteTypes.BABA,
    'w': SpriteTypes.WALL,
    'f': SpriteTypes.FLAG,
    'i': SpriteTypes.IS,
    'k': SpriteTypes.T_BABA,
    'm': SpriteTypes.T_WALL,
    'u': SpriteTypes.T_FLAG,
    's': SpriteTypes.T_STOP,
    'y': SpriteTypes.T_YOU,
    'p': SpriteTypes.T_WIN,

}
