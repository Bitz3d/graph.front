import '../domain/node'
import {Node, NodeMode} from "../domain/node";

export const COLUMN_LENGTH: number = 30;
export const NODES_LENGTH: number = 20;

const createNode = (col: number, row: number): Node => {
    return new Node(col, row);
};

const createRandomStartPlace = (tempBoard: Node[][], columnLength: number, nodesLength: number) => {
    const ranColumn: number = Math.floor(Math.random() * columnLength);
    const ranNode: number = Math.floor(Math.random() * nodesLength);
    tempBoard[ranColumn][ranNode].mode = NodeMode.START;
    tempBoard[ranColumn][ranNode].isVisited = true;
    return tempBoard[ranColumn][ranNode];
}

const createRandomFinishPlace = (tempBoard: Node[][], columnLength: number, nodesLength: number) => {
    const ranColumn = Math.floor(Math.random() * columnLength);
    const ranNode = Math.floor(Math.random() * nodesLength);
    if (tempBoard[ranColumn][ranNode].mode === NodeMode.START) {
        createRandomFinishPlace(tempBoard, columnLength, nodesLength);
    }
    tempBoard[ranColumn][ranNode].mode = NodeMode.FINISH;
}

export const createBoard = () => {
    const createdBoard: Node[][] = Array.apply(null, Array(COLUMN_LENGTH)).map(() => {
        return [];
    });

    for (let i = 0; i < createdBoard.length; i++) {
        for (let j = 0; j < NODES_LENGTH; j++) {
            createdBoard[i].push(createNode(i, j));
        }
    }

    const root = createRandomStartPlace(createdBoard, COLUMN_LENGTH, NODES_LENGTH);
    createRandomFinishPlace(createdBoard, COLUMN_LENGTH, NODES_LENGTH);

    return {createdBoard, root};
}


