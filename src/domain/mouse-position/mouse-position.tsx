import {Coordinate} from "../point/coordinate";

export class MousePosition {
    private readonly _position: Coordinate

    constructor(position: Coordinate) {
        this._position = position;
    }

    get position(): Coordinate {
        return this._position;
    }
}
