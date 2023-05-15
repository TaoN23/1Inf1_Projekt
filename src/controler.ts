import { Level } from './Board';
import { Model } from './model'
import { View, ViewState } from './view';

const firstLevel: Level = {
    meta: {},
    levelString: [
        'wwwwwwwwww',
        'w########w',
        'w##w[#b]w###w',
        'w########w',
        'wwwwwwwwww',
    ]
}
export class Controller{

    levels: Array<Level> = [];
    model: Model;
    view: View;

    constructor() {
        this.levels.push(firstLevel);
        this.model = new Model(this.levels[0], ViewState.START_SCREEN);
        this.view = new View(this.model, this.model.viewState, this);
        this.model.addView(this.view);
    };

    public startGame(): void{
        document.getElementById('startGame')?.removeEventListener('click', this.startGame);
        console.log('sG');
        console.log(this);
        
        console.log(this.model.changeViewState);
        
        this.model.changeViewState(ViewState.GAME_SCREEN);
    }

}
