import {useEffect, useRef, useState} from "react";
import './playgreaund.css'
import {Circle} from "../../domain/circle/circle";
import {Coordinate} from "../../domain/point/coordinate";
import {Acceleration} from "../../domain/acceleration/acceleration";
import {MousePosition} from "../../domain/mouse-position/mouse-position";
import {connect} from "../../configuration/RsocketClient";

let animationFrame;
let graph = [];
const Playground = () => {
    const canvasRef = useRef(null);
    const [attach, setAttach] = useState(false);
    const [focusedCircle, setFocusedCircle] = useState(null);
    const [selectCircle, setSelectCircle] = useState(false);
    const [radius, setRadius] = useState(30);


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

        if (found && attach && focusedCircle) {
            console.log(focusedCircle);
            console.log('connect')
            console.log(found);
            focusedCircle.addNeighbor(found)

        } else {
            addNewCircle(coordinates);
        }

    }

    const handleConnect = () => {
        setAttach(!attach);
        console.log(attach);
    }

    const handleCircleSelection = () => {
        setSelectCircle(!selectCircle);
        console.log(selectCircle);
    }

    function handleReset() {
        setSelectCircle(false);
        setAttach(false);
    }

    function newRequest(socket, algVersion) {
        socket.requestResponse({
            data: null,
            metadata: String.fromCharCode(algVersion.length) + algVersion
        }).subscribe({
            onComplete: (gg) => console.log(gg.data['res']),
            onError: (err) => console.log(err),
            onNext: (res) => {
                console.log("sdsdsd")
                console.log(res)
            }
        })
    }

    const handleTopSort = () => {
        connect().then(socket => newRequest(socket, 'top'));
    }

    return (
        <div>
            <div className="menu">
                <button onClick={handleConnect}>connect</button>
                <button onClick={handleCircleSelection}>select circle</button>
                <button onClick={handleReset}>reset</button>
                <button onClick={handleTopSort}>Top Sort</button>
            </div>
            <canvas className="canvas" onClick={handleOnClick} ref={canvasRef} width={window.innerWidth}
                    height={window.innerHeight}/>
        </div>
    )
}

export default Playground;
