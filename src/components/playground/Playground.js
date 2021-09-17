import {useEffect, useRef} from "react";
import './playgreaund.css'

let recX = 100;

const Playground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath();
            ctx.arc(recX, 75, 50, 0, 22 * Math.PI);
            ctx.stroke()

            ctx.beginPath();
            ctx.arc(400, 75, 50, 0, 22 * Math.PI);
            ctx.stroke()


            ctx.beginPath();
            ctx.moveTo(recX, 75);
            ctx.lineTo(400, 75);
            ctx.stroke();
            recX++;
            requestAnimationFrame(render)
        }

        // render();

    }, [])

    function moveRec() {
        recX += 10;
    }

    return (
        <canvas className="canvas" ref={canvasRef} width={window.innerWidth}
                height={window.innerHeight} onMouseDown={moveRec}></canvas>
    )
}

export default Playground;
