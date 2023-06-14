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
          

          function preload() {
          }
          
          ;
          
          // Create function to set up the scene
          function create() {
            
            view.board!.forEach((row) => {
                row.forEach((column) => {
                    column.forEach((sprite) => {
                            new ViewOBJ(this, view.spriteSize!, sprite.x, sprite.y, sprite.type, view);
                        })
                    })
                })
          
            // Add any additional configuration or interactivity here
          }

          function update() {
            
          }
        

        window.addEventListener('keypress', this.notifyController.bind(this));
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

    public addSprite(sprite: ViewOBJ, x: number, y: number): void{
        this.model.addSprite(sprite, x, y);
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


export class ViewOBJ {
    sprite: Phaser.GameObjects.Rectangle;
    constructor(private scene: Phaser.Scene, private spriteSize: number, x: number, y: number, type: SpriteTypes, private view: View) {
        console.log(this.scene);
        
       this.sprite = this.scene.add.rectangle(this.spriteSize* x, this.spriteSize*y, spriteSize, spriteSize, colorMap[type.toString()]);
        this.view.addSprite(this, x, y);
        
        
    }
    
    public move(x: number, y: number){
        console.log(this.sprite);
        this.scene.children.bringToTop(this.sprite);
        this.sprite.x = this.view.spriteSize!*x;
        this.sprite.y = this.view.spriteSize!*y;
    }
}

const colorMap = {
    'Baba' : 0xcfa378,
    'Void' : 0x0a0a09,
    'Wall' : 0x261503,
    'Flag' : 0xbfaa0a,
    'T_Baba': 0x86945f,
    'Is' : 0xe1eff0,
    'T_You' : 0x6e5e1a,
    'T_Flag' : 0x201d82,
    'T_Win' : 0x29c4c2,
    'T_Stop' : 0xba2326,
    'T_Wall' : 0x58ba23,
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
