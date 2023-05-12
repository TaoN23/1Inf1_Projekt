import { Level } from './Board';
import { Model } from './model'
import { View } from './view';

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
        this.model = new Model(this.levels[0]);
        this.view = new View(this.model);
        this.model.boardModel.log();
    };

}
