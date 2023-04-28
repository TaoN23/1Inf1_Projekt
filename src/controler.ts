import { Level } from './Board';
import { Board, Model } from './model'
import { View } from './view';

export class Controller{

    levels: Array<Level> = [];
    model: Model;
    view: View;

    constructor() {
        this.model = new Model(this.levels[0]);
        this.view = new View(this.model);
    };

}
