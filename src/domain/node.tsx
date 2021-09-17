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

    getBackground() {

        // eslint-disable-next-line default-case
        switch (this.mode) {
            case NodeMode.START:
                return "red";
            case NodeMode.FINISH:
                return "black"
            case NodeMode.WALL:
                return "gray"
            case NodeMode.PATH:
                return "yellow"
            case NodeMode.GROUND:
                return this.isVisited ? "lime" : "white";


        }
    }
}
