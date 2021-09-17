// @ts-ignore

export enum NodeMode {
    START,
    FINISH,
    WALL,
    PATH,
    GROUND
}


export class Node {

    col: number;
    row: number;
    distance: number;
    mode: NodeMode;
    isVisited: boolean;
    path: [];


    constructor(col: number, row: number) {
        this.col = col;
        this.row = row;
        this.distance = 0;
        this.mode = NodeMode.GROUND
        this.isVisited = false;
        this.path = [];
    }

}
