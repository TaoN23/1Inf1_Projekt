import { Controller } from "./controler";
import { Model, Sprite } from "./model";
import { SpriteTypes } from "./Sprites";


export class View {
    canvas: HTMLCanvasElement | undefined;
    appRef: HTMLElement;
    spriteSize: number | undefined;
    context: CanvasRenderingContext2D | null | undefined ;

    constructor(private model: Model, private controller: Controller){
        //this.canvas = this.createCanvas();    
        this.appRef = document.getElementById('app')!;
        if (model.getViewState() === ViewState.START_SCREEN) {
            this.setupStartScreen();
        }
    }

    private setupGame(){
        this.createCanvas();

        const board = this.model.getBoard();

        if (!board) {
            throw new Error("");
        }
        board.forEach((row) => {
            row.forEach((column) => {
                column.forEach((sprite) => {
                    console.log(sprite.width_p);
                    if (this.context != null && this.context != undefined) {
                        new ViewOBJ(sprite, this.context, this.model);
                    }
                })
            })
        })
        

        window.addEventListener('keypress', this.notifyController.bind(this));
    }
    
    private createCanvas(): void{
        this.canvas = document.createElement("canvas");
        this.appRef.appendChild(this.canvas);
        //this.appRef.requestFullscreen();
        this.spriteSize = this.controller.calculateSpriteSize();
        this.canvas.style.width = (this.model.getLevelMeta().width * this.spriteSize).toString() + 'px';
        this.canvas.style.height = (this.model.getLevelMeta().height * this.spriteSize).toString + 'px';
        if (this.canvas.getContext('2d') != null) {
            this.context = this.canvas.getContext('2d');
        }
    }
    
    private setupStartScreen(): void{
        this.appRef.innerHTML = startScreen;
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

    private drawImage(imgURL: string, sizeX: number, sizeY: number, posX: number, posY: number){
       
    }

    private clearView(){
        this.appRef.innerHTML = '';
    }

    private notifyController(event: any){
        const direction = keyMap.get(event.code);
        
        console.log(event.code);
        
        if (direction) {
            this.controller.move(direction)
        }
        
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
    constructor(private sprite: Sprite, private context: CanvasRenderingContext2D, private model: Model) {
        const image = new Image();

        image.onload = () => {
            this.context.drawImage(image, image.width* this.sprite.x, image.width * this.sprite.y, image.width, image.width);
        };

        image.src = imageMap.get(this.sprite.type)!;
        image.width = this.sprite.width_p / 512 ;
        image.height = this.sprite.height_p / 512 * 512;
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
