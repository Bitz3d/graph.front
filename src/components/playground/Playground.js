import {useEffect, useRef} from "react";
import './playgreaund.css'
import {Circle} from "../../domain/circle/circle";
import {Line} from "../../domain/line/line";
import {Coordinate} from "../../domain/point/coordinate";
import {Acceleration} from "../../domain/acceleration/acceleration";

let recX = 100;
let recY = 75;
let acceleration = 10;
let radius = 50;
let animationFrame;
const Playground = () => {
    const canvasRef = useRef(null);
    const movingCircle = new Circle(
        new Coordinate(recX, recY, 0),
        new Acceleration(15, acceleration, 0),
        radius,
        "red"
    )

    const staticCircle = new Circle(
        new Coordinate(400, 75, 0),
        new Acceleration(acceleration, 15, 0),
        radius,
        "red")

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height)


            movingCircle.update(ctx);


            staticCircle.update(ctx);

            const line = new Line(
                new Coordinate(movingCircle.position.x, movingCircle.position.y, 0),
                new Coordinate(staticCircle.position.x, staticCircle.position.y, 0),
                ctx)
            line.draw();


            animationFrame = requestAnimationFrame(render);
        }

        render();


        window.addEventListener('resize', () => {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        })

        return () => {
            window.removeEventListener('resize', () => {
            })
            window.cancelAnimationFrame(animationFrame)
        }


    }, [])

    function moveRec() {
        recX += acceleration;
    }

    return (
        <canvas className="canvas" ref={canvasRef} width={window.innerWidth}
                height={window.innerHeight} onMouseDown={moveRec}></canvas>
    )
}

export default Playground;
