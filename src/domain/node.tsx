// @ts-ignore

import {Coordinate} from "./point/coordinate";

export enum NodeMode {
    START,
    FINISH,
    WALL,
    PATH,
    GROUND
}


export class Node {

    position: Coordinate;
    distance: number;
    mode: NodeMode;
    isVisited: boolean;
    path: [];


    constructor(position: Coordinate) {
        this.position = position
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
