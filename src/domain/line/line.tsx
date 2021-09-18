import {Coordinate} from "../point/coordinate";

export class Line {
    from: Coordinate;
    to: Coordinate;

    constructor(from: Coordinate, to: Coordinate) {
        this.from = from;
        this.to = to;
    }

    draw(ctx: any) {
        ctx.beginPath();
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(this.to.x, this.to.y);
        ctx.stroke();
    }

    update = (from: Coordinate, to: Coordinate, ctx: any) => {
        this.from = from;
        this.to = to;
        this.draw(ctx);
    }

}
