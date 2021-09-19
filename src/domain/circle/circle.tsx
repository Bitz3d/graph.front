import {Coordinate} from "../point/coordinate";
import {Acceleration} from "../acceleration/acceleration";

export class Circle {

    position: Coordinate;
    acceleration: Acceleration;
    radius: number;
    color: string;

    constructor(position: Coordinate,
                acceleration: Acceleration,
                radius: number,
                color: string) {
        this.position = position
        this.acceleration = acceleration;
        this.radius = radius
        this.color = color
    }


    draw = (ctx: any) => {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 22 * Math.PI);
        ctx.stroke()
    }

    update = (ctx: any) => {
        if (this.position.x + this.radius > window.innerWidth || this.position.x - this.radius < 0) {
            this.acceleration.increaseX = -this.acceleration.increaseX;
        }
        if (this.position.y + this.radius > window.innerHeight || this.position.y - this.radius < 0) {
            this.acceleration.increaseY = -this.acceleration.increaseY;
        }

        this.position.x += this.acceleration.increaseX;
        this.position.y += this.acceleration.increaseY;


        this.draw(ctx);
    }
}
