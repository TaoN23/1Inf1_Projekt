import { Level } from './Board';
import { Model } from './model'
import { View } from './view';

const firstLevel: Level = {
    meta: {},
    levelString: [
        'wwwwwwwwwwwwwwwwwwww',
        'w#######[#w]########ww',
        'w#######wwww######w',
        'w###[#b]#############w',
        'wwwwwwwwwwwwwwwwwwww',
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
    };

}
