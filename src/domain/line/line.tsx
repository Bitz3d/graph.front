import {Coordinate} from "../point/coordinate";

export class Line {
    from: Coordinate;
    to: Coordinate;
    ctx: any;

    constructor(from: Coordinate, to: Coordinate, ctx: any) {
        this.from = from;
        this.to = to;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.from.x, this.from.y);
        this.ctx.lineTo(this.to.x, this.to.y);
        this.ctx.stroke();
    }

}
