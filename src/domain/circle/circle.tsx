import {Coordinate} from "../point/coordinate";
import {Acceleration} from "../acceleration/acceleration";
import {MousePosition} from "../mouse-position/mouse-position";
import {Line} from "../line/line";

export class Circle {

    position: Coordinate;
    acceleration: Acceleration;
    radius: number;
    color: string;
    neighbors: Circle[]

    constructor(position: Coordinate,
                acceleration: Acceleration,
                radius: number,
                color: string) {
        this.position = position;
        this.acceleration = acceleration;
        this.radius = radius;
        this.color = color;
        this.neighbors = [];
    }

    addNeighbor = (neighbor: Circle) => {
        this.neighbors.push(neighbor);
    }


    getCircle = (mousePosition: MousePosition) => {
        if (this._circleClicked(mousePosition)) {
            return this;
        }
    }

    connectNeighbor = (ctx: any) => {
        this.neighbors.forEach(n => {
            const line = new Line(
                new Coordinate(n.position.x, n.position.y, n.position.y),
                new Coordinate(this.position.x, this.position.y, this.position.z));
            line.draw(ctx);
        })
    }

    _circleClicked = (mousePosition: MousePosition) => {
        const distance =
            Math.sqrt(
                ((mousePosition.position.x - this.position.x) * (mousePosition.position.x - this.position.x))
                +
                ((mousePosition.position.y - this.position.y) * (mousePosition.position.y - this.position.y))
            );
        return distance < this.radius;

    }

    draw = (ctx: any) => {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 22 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
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
