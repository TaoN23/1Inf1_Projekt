interface LevelString {
    meta: {},
    board: RawBoard;
}

class Level {
    
    private board: Board;

    constructor(private levelString: LevelString,){
        this.board = new Board(levelString.board);
    }


    public addSprite(){
        
    }
}


interface RawBoard {
    rawBoard: Array<string>
}


class Board {

    board: Array<Array<Array<Object>>>;

    constructor(private rawBoard: RawBoard) {
        this.board = this.parseBoard();
    }

    private parseBoard(): Array<Array<Array<Object>>> {
        // TODO: Parse Logic 
        return [[[{}]]]
    }

    public addSprite() {

    }


}

