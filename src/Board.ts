import { Sprite } from "./model";
import { SpriteTypes } from "./Sprites";
import { ViewOBJ } from "./view";


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

     /**
     * Erstellt eine Instanz von Board.
     * @param {string[]} rawBoard - Spielfelddaten.
     * @param {number} spriteSize - Die Größe der Sprites.
     */
    constructor(rawBoard: Array<string>, private spriteSize: number) {
        this.parseBoard(rawBoard);
        this.log();
        
    }

     /**
     * Analysiert die Spielfelddaten und erstellt das Spielfeld in Form eines Tensors.
     * @private
     * @param {string[]} leveldata - Das LEvel als String.
     * @returns {void}
     */
     private parseBoard(leveldata: String[] ): void {

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

     /**
     * Fügt die Sprite-Daten zum Spielfeld-Tensor hinzu.
     * @private
     * @param {number} x - Die x-Koordinate.
     * @param {number} y - Die y-Koordinate.
     * @param {number} width - Die Breite.
     * @param {number} height - Die Höhe.
     * @param {SpriteTypes} type - Der Sprite-Typ.
     * @returns {void}
     */
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


     /**
     * View Objekte können sich in den Spielfeld-Tensor eintragen 
     * .@public
     * @param {ViewOBJ} sprite - Das Sprite-Objekt.
     * @param {number} x - Die x-Koordinate.
     * @param {number} y - Die y-Koordinate.
     * @returns {void}
     */
    public addSprite(sprite: ViewOBJ, x: number, y: number) {
        const length = this.board[y][x].length;
        this.board[y][x][length-1].reference = sprite;
    }

    public log(){
        let foo = '';
        // console.log(JSON.stringify(this.board[1]));
        // this.board.forEach((row) => {
        //     row.forEach((column) => {
        //         if (column){
        //             foo += structuredClone(column).pop().type.toString();
                    
        //         }
        //     })
        //     foo += '\n';
            
        // })
        
        console.log(foo);
        

    }

    /**
     * Gibt eine Kopie des Spielfelds zurück .
     * @public
     * @returns {ModelBoard}
     */
    public get boardCopy() : ModelBoard {
        return [...this.board]
    }

     /**
     * Gibt den Spieler entsprechend des aktuellen Spielers zurück.
     * @public
     * @param {SpriteTypes} currentPlayer - Der aktuelle Spieler-TYPE.
     * @returns {Sprite[]} - Array der aktuellen Spieler.
     */
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
    
     /**
     * Gibt die "IS"-Sprites zurück.
     * @public
     * @returns {Sprite[]} - Die "IS"-Sprites.
     */
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
    

    /**
     * Gibt den Sprite an der angegebenen Position zurück.
     * @public
     * @param {number} x - Die x-Koordinate.
     * @param {number} y - Die y-Koordinate.
     * @returns {Sprite|undefined} - Der Sprite an der angegebenen Position.
     */
    public getSprite(x: number , y: number): Sprite | undefined{
        
        return this.board[y][x].findLast((i) => i,);
    }

    /**
     * Setzt den angegebenen Sprite an die angegebene Position.
     * @public
     * @param {Sprite} sprite - Der zu setzende Sprite.
     * @param {number} x - Die x-Koordinate.
     * @param {number} y - Die y-Koordinate.
     * @returns {void}
     */
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
