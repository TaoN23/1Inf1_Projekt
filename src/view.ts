import { Controller } from "./controler";
import { Model } from "./model";


export class View {
    canvas: HTMLCanvasElement | null = null;
    appRef: HTMLElement;

    constructor(private model: Model, private state: ViewState, private controller: Controller){
        //this.canvas = this.createCanvas();    
        this.appRef = document.getElementById('app')!;
        if (state === ViewState.START_SCREEN) {
            this.setupStartScreen();
        }
    }

    private setupGame(){
        this.createCanvas();
    }
    
    private createCanvas(): HTMLCanvasElement{
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        return this.canvas
    }
    
    setupStartScreen(): void{
        this.appRef.innerHTML = startScreen;
        console.log(this.controller);
        
        document.getElementById('startGame')!.addEventListener('click', this.controller.startGame.bind(this.controller));
    }

    stateChange(): void{
        console.log(this.state);
        
        if (this.state === ViewState.GAME_SCREEN) {
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