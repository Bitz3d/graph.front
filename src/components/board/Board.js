import {useEffect, useState} from "react";
import './board.css'
import Tile from "../tile/tile";
import {connect} from "../../configuration/RsocketClient";
import {COLUMN_LENGTH, createBoard, NODES_LENGTH} from "../../service/board-creator";
import {NodeMode} from "../../domain/node";

const Board = () => {
    const [board, setBoard] = useState([])
    const [root, setRoot] = useState()
    const [clicked, setClicked] = useState(false)

    function handleBoardCreation() {
        let newBoard = createBoard();
        setBoard(newBoard.createdBoard)
        setRoot(newBoard.root)
    }

    useEffect(() => {
        handleBoardCreation();
    }, []);


    const BreadthFirstSearchHandler = () => {
        connect().then(socket => newRequest(socket, 'bfs'));
    }

    const DeepFirstSearchHandler = () => {
        connect().then(socket => newRequest(socket, 'dfs'));
    }

    const handleClearOnClick = () => {
        let newBoard = createBoard();
        setBoard(newBoard.createdBoard)
        setRoot(newBoard.root)
    }

    const handleOnNext = (res) => {
        const data = res.data;
        board[data.position.x][data.position.y].isVisited = data.isVisited;
        if (NodeMode.FINISH === board[data.position.x][data.position.y].mode) {
            console.log(data.path);
            data.path.forEach(node => {
                console.log(node);
                board[node.position.x][node.position.y].mode =
                    NodeMode.START === board[node.position.x][node.position.y].mode
                        ?
                        NodeMode.START
                        :
                        NodeMode.PATH;

            })
        }
        // we need to add new reference to force react to rerender element
        setBoard([...board]);

    }

    const newRequest = (socket, algVersion) => {
        const graph = {
            grade: board,
            root: root
        }

        socket.requestStream({
            data: graph,
            metadata: String.fromCharCode(`board.${algVersion}`.length) + `board.${algVersion}`
        }).subscribe({
            onError: (err) => console.log(err),
            onNext: (res) => handleOnNext(res),
            onSubscribe: subscription => {
                subscription.request(COLUMN_LENGTH * NODES_LENGTH); // set it to some max value
            }
        })
    }

    const handleTitleOnClick = () => {
        setClicked(!clicked)
    }
    const hoverHandle = (node) => {
        function shouldMakeWall() {
            return clicked
                && !board[node.position.x][node.position.y].isVisited
                && (NodeMode.GROUND === board[node.position.x][node.position.y].mode
                    || NodeMode.WALL === board[node.position.x][node.position.y].mode);
        }

        if (shouldMakeWall()) {
            board[node.position.x][node.position.y].mode = board[node.position.x][node.position.y].mode === NodeMode.WALL ? NodeMode.GROUND : NodeMode.WALL
            // we need to add new reference to force react to rerender element
            setBoard([...board])
        }
    }

    return (
        <div>
            <button onClick={BreadthFirstSearchHandler}>BFS</button>
            <button onClick={DeepFirstSearchHandler}>DFS</button>
            <button onClick={handleClearOnClick}>Clear</button>
            <div className="board">
                {board.map((column, i) => {
                    return <div key={i} className="column">
                        {column.map((node, index) => <Tile key={index} node={node}
                                                           click={handleTitleOnClick}
                                                           hover={() => hoverHandle(node)}/>)}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Board
