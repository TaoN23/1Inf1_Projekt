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

     private parseBoard(shortcut: String ): ModelBoard {
        // TODO: Parse Logic 
        //this.board[y][x][length] = {x: 0, y: 0, width: 20, height: 20, type: SpriteTypes.WALL};
        

        	for (let index: = 0; index < array.length; index:++) {
                const element = array[index:];
                




                
            }

        switch(shortcut) {
            case 'w' : 
            


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



}

