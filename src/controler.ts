import { Board, Model } from './model'
import { View } from './view';

export class Controller{

    levels: Array<Board> = [];
    model: Model;
    view: View;

    constructor() {
        this.model = new Model(this.levels[0]);
        this.view = new View(this.model);
    };

}
