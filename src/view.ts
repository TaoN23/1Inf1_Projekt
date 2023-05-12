import { Model } from "./model";


export class View {
    canvas: HTMLCanvasElement;

    constructor(private model: Model, private state: ViewState){
        //this.canvas = this.createCanvas();    
        this.setup();
    }
    
    createCanvas(): HTMLCanvasElement{
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        return this.canvas
    }
    
    setup(): void{
        this.canvas.requestFullscreen();
    }
}
    enum ViewState {
        START_SCREEN,
        PAUSE_SCREEN,
        GAME_SCREEN,
    };
