import { Level } from "./Board";
import {
  SpriteTextObjectTypes,
  SpriteTypes,
  SpriteTextVerbObjectTypes,
  SpriteTextToSprite,
  moveAble,
} from "./Sprites";
import { Model } from "./model";
import { Sprite } from "./model";
import { Keys, View, ViewState } from "./view";

const firstLevel: Level = {
    meta: {
        height: 5,
        width: 9,
    },
    levelString: [
        '[#k][#i][#y]###[#w][#u]##',
        '######[#w]##[#i]',
        '[#m][#i][#s]###[#w][#p]##',
        '######[#w]##[#f]',
        '[#b]#####[#w]###',
        '######[#w]###',
    ]


}


export class Controller {
  /**
   * Ein Array von Leveln.
   * @type {Level[]}
   * @private
   */
  private levels: Level[] = [];

  /**
   * Das Model-Objekt.
   * @type {Model}
   * @private
   */
  private model: Model;

  /**
   * Das View-Objekt.
   * @type {View}
   * @private
   */
  private view: View;

  /**
   * Das aktuelle Level.
   * @type {Level}
   * @private
   */
  private currentLevel: Level;

  constructor() {
    this.levels.push(firstLevel);
    this.currentLevel = this.levels[0];
    this.model = new Model(ViewState.START_SCREEN);
    this.view = new View(this.model, this);
    this.model.addView(this.view);
  }

  /**
   * Startet das Spiel.
   * @public
   * @returns {void}
   */
  public startGame(): void {
    document
      .getElementById("startGame")
      ?.removeEventListener("click", this.startGame);

    this.model.changeViewState(ViewState.GAME_SCREEN);
  }

  /**
   * Berechnet die Größe der Sprites.
   * @public
   * @returns {number} - Die Größe der Sprites.
   */
  public calculateSpriteSize() {
    const spriteSize = window.innerWidth / this.currentLevel.meta.width;

    this.model.loadLevel(this.levels[0], spriteSize);

    return spriteSize;
  }

  /**
   * Führt die Überprüfung in Richtung "oben" rekursiv durch.
   * @private
   * @param {number} spritex - Die x-Koordinate des Sprites.
   * @param {number} spritey - Die y-Koordinate des Sprites.
   * @returns {number[][]} - Ein Array mit den Koordinaten der überprüften Sprites.
   */
  private checkUpRecursive(
    spritex: number,
    spritey: number
  ): Array<Array<number>> {
    // holt sich den darüber gelegenen Sprite
    const up = this.getUp(spritex, spritey);

    // wenn darüber die Map zuende ist oder ein Sprite mit der stop Eigenschaft
    if (up === undefined || up.type === this.model.getCurrentStop()) {
      return [[-1]];
    }

    // wenn ein zu bewegendes Objekt darüber liegt
    if (
      up.type === this.model.getCurrentPlayer() ||
      moveAble.hasOwnProperty(up.type.toString())
    ) {
      // gibt die zu bewegenden sprites zurück, die Reihenfolge ist wichtig, um überschreibungen zu vermeiden
      return [...this.checkUpRecursive(up.x, up.y), [spritex, spritey]];
    }

    // wenn der obere Sprite nicht bewegbares aber auch kein Stop Objekt ist, gibt es den aktuellen Sprite zurück
    return [[spritex, spritey]];
  }
  

  private checkDownRecursive(
    spritex: number,
    spritey: number
  ): Array<Array<number>> {
    const down = this.getDown(spritex, spritey);

    if (down === undefined || down.type === this.model.getCurrentStop()) {
      return [[-1]];
    }


    if (
      down.type === this.model.getCurrentPlayer() ||
      moveAble.hasOwnProperty(down.type.toString())
    ) {
      return [...this.checkDownRecursive(down.x, down.y), [spritex, spritey]];
    }

    return [[spritex, spritey]];
  }
  

  private checkLeftRecursive(
    spritex: number,
    spritey: number
  ): Array<Array<number>> {
    const left = this.getLeft(spritex, spritey);

    if (left === undefined || left.type === this.model.getCurrentStop()) {
      return [[-1]];
    }

    if (
      left.type === this.model.getCurrentPlayer() ||
      moveAble.hasOwnProperty(left.type.toString())
    ) {
      return [...this.checkLeftRecursive(left.x, left.y), [spritex, spritey]];
    }

    return [[spritex, spritey]];
  }
  private checkRightRecursive(
    spritex: number,
    spritey: number
  ): Array<Array<number>> {
    const right = this.getRight(spritex, spritey);

    if (right === undefined || right.type === this.model.getCurrentStop()) {
      return [[-1]];
    }

    if (
      right.type === this.model.getCurrentPlayer() ||
      moveAble.hasOwnProperty(right.type.toString())
    ) {
      return [
        ...this.checkRightRecursive(right.x, right.y),
        [spritex, spritey],
      ];
    }

    return [[spritex, spritey]];
  }

  /**
   * Bewegt die Sprites entsprechend des Tastendrucks.
   * @public
   * @param {Keys} key - Die gedrückte Taste.
   * @returns {void}
   */
  public move(key: Keys) {
    this.updateLogic();
    const currentPlayer = this.model.getPlayer();

    switch (key) {
      case Keys.KEY_UP:
        // Holt sich alle Sprites mit der Player Eigenschaft
        currentPlayer?.forEach((sprite) => {
          // prüft, ob der Zug möglich ist
          const checked = this.checkUpRecursive(sprite.x, sprite.y);
          if (checked[0][0] === -1) {
            return;
          }
          if(this.getUp(sprite.x, sprite.y)?.type == this.model.getCurrentWin()){
                        alert('win')
                    }
          // fügt alle zu bewegenden Sprites in ein Array
          for (const localSprite of checked) {
            const up = this.getUp(localSprite[0], localSprite[1]);
            this.model.prepareMove(
              this.model.getSprite(localSprite[0], localSprite[1])!,
              up!.x,
              up!.y
            );
          }
        });

        break;

      case Keys.KEY_DOWN:
        currentPlayer?.forEach((sprite) => {
          const checked = this.checkDownRecursive(sprite.x, sprite.y);

          if (checked[0][0] === -1) {
            return;
          }
          
          if(this.getDown(sprite.x, sprite.y)?.type == this.model.getCurrentWin()){
                    alert('win')
                }
          
          for (const localSprite of checked) {
            const down = this.getDown(localSprite[0], localSprite[1]);
            this.model.prepareMove(
              this.model.getSprite(localSprite[0], localSprite[1])!,
              down!.x,
              down!.y
            );
          }
        });

        break;

      case Keys.KEY_LEFT:
        currentPlayer?.forEach((sprite) => {
          const checked = this.checkLeftRecursive(sprite.x, sprite.y);

          console.log(checked);

          if (checked[0][0] === -1) {
            return;
          }
          
           if(this.getLeft(sprite.x, sprite.y)?.type == this.model.getCurrentWin()){
                    alert('win')
                }
          
          for (const localSprite of checked) {
            const left = this.getLeft(localSprite[0], localSprite[1]);
            console.log(left);

            this.model.prepareMove(
              this.model.getSprite(localSprite[0], localSprite[1])!,
              left!.x,
              left!.y
            );
          }
        });

        break;

      case Keys.KEY_RIGHT:
        currentPlayer?.forEach((sprite) => {
          const checked = this.checkRightRecursive(sprite.x, sprite.y);

          if (checked[0][0] === -1) {
            return;
          }
          
          if(this.getRight(sprite.x, sprite.y)?.type == this.model.getCurrentWin()){
                        alert('win')
                    }
          
          for (const localSprite of checked) {
            const right = this.getRight(localSprite[0], localSprite[1]);
            this.model.prepareMove(
              this.model.getSprite(localSprite[0], localSprite[1])!,
              right!.x,
              right!.y
            );
          }
        });

        break;
    }

    this.model.move();
  }

  /**
   * Setzt neue Regeln für die Sprites.
   * @private
   * @param {Sprite | undefined} sprite1 - Das erste Sprite.
   * @param {Sprite | undefined} sprite2 - Das zweite Sprite.
   * @returns {void}
   */
  private setNewRules(
    sprite1: Sprite | undefined,
    sprite2: Sprite | undefined
  ): void {
    console.log(sprite1, sprite2);

    // wenn ein Sprite links oder über einem IS existiert
    if (sprite1) {
        // wenn dieser Sprite ein Text-Objekt ist
      if (SpriteTextObjectTypes.hasOwnProperty(sprite1.type.toString())) {
        // wenn der Sprite rechts oder unter dem IS objekt existiert
        if (sprite2) {
            // wenn es sich um ein Text-verb handelt
          if (
            SpriteTextVerbObjectTypes.hasOwnProperty(sprite2.type.toString())
          ) {

            // mögliche set-Aktionen:
            const actionMap: any = {
              T_You: (newPlayer: SpriteTypes) => {
                this.model.setCurrentPlayer(newPlayer);
              },

              T_Stop: (newStop: SpriteTypes) => {
                console.log(newStop);

                this.model.setCurrentStop(newStop);
              },

              T_Win: (newWin: SpriteTypes) => {
                this.model.setCurrentWin(newWin);
              },
            };

            actionMap[sprite2.type.toString()](
              SpriteTextToSprite[sprite1.type.toString()]
            );
          }
        }
      }
    }

  }

  /**
   * Aktualisiert die Logik des Spiels.
   * @private
   * @returns {void}
   */
  private updateLogic() {
    this.model.setCurrentStop(null);
    this.model.setCurrentWin(null);

    const is = this.model.getIs();

    is?.forEach((is: Sprite) => {
      console.log(is);

      const left: Sprite | undefined = this.getLeft(is.x, is.y);
      const right: Sprite | undefined = this.getRight(is.x, is.y);

      this.setNewRules(left, right);

      const up: Sprite | undefined = this.getUp(is.x, is.y);
      const down: Sprite | undefined = this.getDown(is.x, is.y);

      this.setNewRules(up, down);
    });
  }

  /**
   * Gibt das Sprite rechts von der gegebenen Position zurück.
   * @public
   * @param {number} x - Die x-Koordinate des Sprites.
   * @param {number} y - Die y-Koordinate des Sprites.
   * @param {number} [z] - Die z-Koordinate des Sprites.
   * @returns {Sprite | undefined} - Das Sprite rechts von der gegebenen Position.
   */
  public getRight(x: number, y: number, z?: number): Sprite | undefined {
    const newX = x + 1;
    const newY = y;

    if (x === this.currentLevel.meta.width) {
      return undefined;

    }

    return this.model.getSprite(newX, newY);
  }

  public getLeft(x: number, y: number, z?: number): Sprite | undefined {
    const newX = x - 1;
    const newY = y;

    if (newX < 0) {
      return undefined;
    }

    return this.model.getSprite(newX, newY);
  }

  public getDown(x: number, y: number, z?: number): Sprite | undefined {
    const newX = x;
    const newY = y + 1;

    if (y === this.currentLevel.meta.height) {
      console.log("y");

      return undefined;
    }

    return this.model.getSprite(newX, newY);
  }
  public getUp(x: number, y: number, z?: number): Sprite | undefined {
    const newX = x;
    const newY = y - 1;
    console.log(newY);

    if (newY < 0) {
      return undefined;
    }

    return this.model.getSprite(newX, newY);
  }
}
