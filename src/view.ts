import Phaser from "phaser";
import { Controller } from "./controler";
import { Model, Sprite } from "./model";
import { SpriteTypes } from "./Sprites";
import { Board, ModelBoard } from "./Board";


export class View {
    appRef: HTMLElement | null;
    board: ModelBoard | undefined;
    spriteSize: number | undefined;
    game: Phaser.Game | undefined;
    scene: Phaser.Scene | undefined;

    constructor(private model: Model, private controller: Controller){
        this.appRef = document.getElementById('app');
        this.spriteSize = this.controller.calculateSpriteSize()
        if (model.getViewState() === ViewState.START_SCREEN) {
            this.setupStartScreen();
        }
    }
    
    private setupGame(){
        this.board = this.model.getBoard();
    
        if (!this.board) {
            throw new Error("");
        }
        console.log(this.spriteSize);
        

        
        var config = {
            type: Phaser.AUTO,
            width: this.spriteSize!* this.model.getLevelMeta().width,
            height: this.spriteSize!* this.model.getLevelMeta().height,
            view: this,
            scene: {
              preload: preload,
              create: create
            }
        };
          
          var game = new Phaser.Game(config);

          const view = this;
          
          // Preload function to load any assets
          function preload() {
            // Load any necessary assets here (e.g., images, sounds)
          }
          
          ;
          
          // Create function to set up the scene
          function create() {
            
            view.board!.forEach((row) => {
                row.forEach((column) => {
                    column.forEach((sprite) => {
                        // new ViewOBJ(this.scene!, this.spriteSize!, sprite.x, sprite.y)
                            console.log(this);
                            
                            this.add.rectangle(view.spriteSize!* sprite.x, view.spriteSize!*sprite.y, view.spriteSize, view.spriteSize, 0x0000ff);
                        })
                    })
                })
          
            // Add any additional configuration or interactivity here
          }
        

        window.addEventListener('keypress', this.notifyController.bind(this));
    }

    private setUpLevel(){



       
    }
    
    private setupStartScreen(): void{
        this.appRef!.innerHTML = startScreen;
        console.log(this.controller);
        
        document.getElementById('startGame')!.addEventListener('click', this.controller.startGame.bind(this.controller));
    }

    public stateChange(): void{
        console.log(this.model.getViewState());
        
        if (this.model.getViewState() === ViewState.GAME_SCREEN) {
           this.clearView();
           this.setupGame(); 
           return; 
        }
    }


    private clearView(){
        this.appRef!.innerHTML = '';
    }

    private notifyController(event: any){
        const direction = keyMap.get(event.code);
        
        
        if (direction) {
            this.controller.move(direction)
        }
        
    }

    public setScene(scene: Phaser.Scene){
        this.scene = scene;
        this.setUpLevel();
    }
}


const imageMap = new Map()
imageMap.set(SpriteTypes.VOID, './assets/black-square.png');

export enum ViewState {
        START_SCREEN,
        PAUSE_SCREEN,
        GAME_SCREEN,
    };


const startScreen = '<h1>Startscreen</h1> <button id="startGame">Play</button>'


class ViewOBJ {
    constructor(private scene: Phaser.Scene, private spriteSize: number, x: number, y: number) {
        console.log(this.scene);
        
       this.scene.add.rectangle(this.spriteSize* x, this.spriteSize*y, spriteSize, spriteSize, 0xffffff)
    }
}
class GameScene extends Phaser.Scene{
    constructor(private view: View){
        super('GameScene');
        console.log('gbzuguziguzhigb');
        
    }

    create(){
        console.log(this);
        console.log('Aifohusiazhfiahjfiohj');
        
        this.view.setScene(this);
    }
    

    update(time: number, delta: number): void {
        
    }
}
export enum Keys {
    KEY_UP = 'w',
    KEY_DOWN = 's',
    KEY_LEFT = 'a',
    KEY_RIGHT = 'd',
}

const keyMap = new Map();

keyMap.set('KeyW', Keys.KEY_UP);
keyMap.set('KeyS', Keys.KEY_DOWN);
keyMap.set('KeyA', Keys.KEY_LEFT);
keyMap.set('KeyD', Keys.KEY_RIGHT);
