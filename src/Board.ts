import { Sprite } from "./model";
import { SpriteTypes, thing } from "./Sprites";
import { baba } from "./Sprites";


interface LevelString {
    meta: {},
    board: RawBoard;
}

export class Level {
    
    private board: Board;

    constructor(private levelString: LevelString,){
        this.board = new Board(this.levelString.board);
    }


    public addSprite(sprite: Sprite, x: number, y: number){
        this.board.addSprite(sprite, x, y);
    }
}


interface RawBoard {
    rawBoard: Array<string>
}

type ModelBoard = Array<Array<Array<Sprite>>>;

class Board {

    board: ModelBoard;

    constructor(private rawBoard: RawBoard) {
        this.board = this.parseBoard(this.rawBoard);
    }

     private parseBoard(shortcut: String , leveldata: String[] ): ModelBoard {
        // TODO: Parse Logic 
        //this.board[y][x][length] = {x: 0, y: 0, width: 20, height: 20, type: SpriteTypes.WALL};
        
            let x: number = 0;
            let z: number;
            
            for (let row: number = 0; row < leveldata.length; row++) {


                for (let column: number = 0; column < leveldata[row].length; column++) {                    

                                       
                    if ( leveldata.at(column) == '[') {
                        
                        column++;
 
                        for (z = 0; z > -1; z++) {

                            this.board.getSprite(leveldata.at(column), x, row, z)
                         
                            
                            if (leveldata.at(column)==']') {
                                
                                break

                            }

                            column++;

                        }

                    }

                    z = 0;

                    this.board.getSprite(leveldata.at(column), x, row, z);

                }


            }


        
        return [[[{}]]]
    }

    private addSpriteData(x: number, y: number, width: number, height: number, type: SpriteTypes){
        const length = this.board[y][x].length;
        this.board[y][x][length] = {x, y, width_p: width, height_p: height, type};
    }

    public addSprite(sprite: Sprite, x: number, y: number) {
        const length = this.board[y][x].length;
        this.board[y][x][length].reference = sprite;
    }


    public getSprite( shortcut: String , x: number , y: number , z: number){
        switch (shortcut) {
            
            case '#': return null;
            case 'b': return this.board[y][x][length] = {x: 0, y: 0, width: 20, height: 20, type: SpriteTypes.BABA}
            case 'w': return this.board[y][x][length] = {x: 0, y: 0, width: 20, height: 20, type: SpriteTypes.WALL}

        }



    }



}

