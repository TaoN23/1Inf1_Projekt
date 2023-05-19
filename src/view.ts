import { Controller } from "./controler";
import { Model } from "./model";


export class View {
    canvas: HTMLCanvasElement | undefined;
    appRef: HTMLElement;
    spriteSize: number | undefined;

    constructor(private model: Model, private controller: Controller){
        //this.canvas = this.createCanvas();    
        this.appRef = document.getElementById('app')!;
        if (model.getViewState() === ViewState.START_SCREEN) {
            this.setupStartScreen();
        }
    }

    private setupGame(){
        this.createCanvas();
    }
    
    private createCanvas(): void{
        this.canvas = document.createElement("canvas");
        this.appRef.appendChild(this.canvas);
        this.appRef.requestFullscreen();
        this.spriteSize = this.controller.calculateSpriteSize();
        this.canvas.style.width = (this.model.getLevelMeta().width * this.spriteSize).toString() + 'px';
        this.canvas.style.height = (this.model.getLevelMeta().height * this.spriteSize).toString + 'px';

        const ctx = this.canvas.getContext('2d');
        console.log(ctx);
        
        ctx!.fillStyle = 'rgb(200, 0, 0)';
        
        
        
    }
    
    setupStartScreen(): void{
        this.appRef.innerHTML = startScreen;
        console.log(this.controller);
        
        document.getElementById('startGame')!.addEventListener('click', this.controller.startGame.bind(this.controller));
    }

    stateChange(): void{
        console.log(this.model.getViewState());
        
        if (this.model.getViewState() === ViewState.GAME_SCREEN) {
           this.clearView();
           this.setupGame(); 
           return; 
        }
    }

    private clearView(){
        this.appRef.innerHTML = '';
    }

}


export enum ViewState {
        START_SCREEN,
        PAUSE_SCREEN,
        GAME_SCREEN,
    };


const startScreen = '<h1>Startscreen</h1> <button id="startGame">Play</button>'