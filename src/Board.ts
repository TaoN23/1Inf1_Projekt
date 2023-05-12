import { Sprite } from "./model";
import { SpriteTypes } from "./Sprites";


export interface Level {
    levelString: Array<string>;
    meta: Object;
}


type ModelBoard = Array<Array<Array<Sprite>>> ;

export class Board {

    private board: ModelBoard = [];

    constructor(rawBoard: Array<string>) {
        this.parseBoard(rawBoard);
        console.log(this.board);
        
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
                        
                        while(true) {
                            delayCounter++;
                            if (leveldata[row].at(column)==']') {
                                
                                continue column_loop;
                                
                            }
                            console.log(leveldata[row].at(column));
                            // @ts-expect-error
                            this.addSpriteData(column - delayCounter, row, 20, 20, shortcutMap[leveldata[row].at(column)]);
                         
                            column++;

                        }

                    }
                    //@ts-expect-error
                    this.addSpriteData(column - delayCounter, row, 20, 20, shortcutMap[leveldata[row].at(column)]);
                }

            }
    }

    private addSpriteData(x: number, y: number, width: number, height: number, type: SpriteTypes){
        if (!this.board[y])
            this.board[y] = [];
        if (!this.board[y][x])
            this.board[y][x] = [];
        this.board[y][x].push({x, y, width_p: width, height_p: height, type});
    }


    // View Objekte können sich eintragen
    public addSprite(sprite: Sprite, x: number, y: number) {
        const length = this.board[y][x].length;
        this.board[y][x][length].reference = sprite;
    }

    public log(){
        console.log(JSON.stringify(this.board[2]));

    }

    // public getSprite( shortcut: String , x: number , y: number , z: number){
    //     switch (shortcut) {
            
    //         case '#': return null;
    //         case 'b': return this.board[y][x][length] = {x: 0, y: 0, width_p: 20, height_p: 20, type: SpriteTypes.BABA}
    //         case 'w': return this.board[y][x][length] = {x: 0, y: 0, width_p: 20, height_p: 20, type: SpriteTypes.WALL}

    //     }
    // }
 
}

const shortcutMap = {
    '#': SpriteTypes.VOID,
    'b': SpriteTypes.BABA,
    'w': SpriteTypes.WALL,
}
