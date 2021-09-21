import {useEffect, useRef, useState} from "react";
import './playgreaund.css'
import {Circle} from "../../domain/circle/circle";
import {Line} from "../../domain/line/line";
import {Coordinate} from "../../domain/point/coordinate";
import {Acceleration} from "../../domain/acceleration/acceleration";
import {MousePosition} from "../../domain/mouse-position/mouse-position";

let recX = 100;
let recY = 75;
let acceleration = 10;
let radius = 30;
let animationFrame;
let graph = [];
const Playground = () => {

    const movingCircle = new Circle(
        new Coordinate(recX, recY, 0),
        new Acceleration(15, acceleration, 0),
        radius,
        "red"
    )

    const canvasRef = useRef(null);
    const [connect, setConnect] = useState(false);
    const [focusedCircle, setFocusedCircle] = useState(null);
    const [selectCircle, setSelectCircle] = useState(false);

    const staticCircle = new Circle(
        new Coordinate(400, 75, 0),
        new Acceleration(acceleration, 15, 0),
        radius,
        "red")

    const line = new Line(
        new Coordinate(movingCircle.position.x, movingCircle.position.y, 0),
        new Coordinate(staticCircle.position.x, staticCircle.position.y, 0))

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            graph.forEach(node => {
                node.draw(ctx);
                node.connectNeighbor(ctx);
            });


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

    function addNewCircle(coordinates) {
        let found = graph.find(node => node._circleClicked(new MousePosition(coordinates)));
        if (!found) {
            graph.push(
                new Circle(
                    coordinates,
                    new Acceleration(12, 1, 12),
                    radius,
                    'red'));
        }
    }

    const handleOnClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const coordinates = new Coordinate(e.clientX - rect.left, e.clientY - rect.top, 0);
        const mousePosition = new MousePosition(coordinates)

        let found = graph.find(node => node._circleClicked(mousePosition));

        if (found && selectCircle) {
            console.log('select circle')
            console.log(found);
            setFocusedCircle(found);
        }

        if (found && connect && focusedCircle) {
            console.log(focusedCircle);
            console.log('connect')
            console.log(found);
            focusedCircle.addNeighbor(found)

        } else {
            addNewCircle(coordinates);
        }

    }

    const handleConnect = () => {
        setConnect(!connect);
        console.log(connect);
    }

    const handleCircleSelection = () => {
        setSelectCircle(!selectCircle);
        console.log(selectCircle);
    }

    function handleReset() {
        setSelectCircle(false);
        setConnect(false);
    }

    return (
        <div>
            <div className="menu">
                <button onClick={handleConnect}>connect</button>
                <button onClick={handleCircleSelection}>select circle</button>
                <button onClick={handleReset}>reset</button>
            </div>
            <canvas className="canvas" onClick={handleOnClick} ref={canvasRef} width={window.innerWidth}
                    height={window.innerHeight}/>
        </div>
    )
}

export default Playground;
