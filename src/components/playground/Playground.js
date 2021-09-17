import {useEffect, useRef} from "react";
import './playgreaund.css'

let recX = 100;
let recY = 75;
const Playground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath();
            ctx.arc(recX, recY, 50, 0, 22 * Math.PI);
            ctx.stroke()

            ctx.beginPath();
            ctx.arc(400, 75, 50, 0, 22 * Math.PI);
            ctx.stroke()


            ctx.beginPath();
            ctx.moveTo(recX, recY);
            ctx.lineTo(400, 75);
            ctx.stroke();

            function transform() {
                recX++;
                recY++;
            }

            transform();
            requestAnimationFrame(render)
        }

        render();

    }, [])

    function moveRec() {
        recX += 10;
        recY += 10;
    }

    return (
        <canvas className="canvas" ref={canvasRef} width={window.innerWidth}
                height={window.innerHeight} onMouseDown={moveRec}></canvas>
    )
}

export default Playground;
