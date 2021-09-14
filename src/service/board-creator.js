export const COLUMN_LENGTH = 30;
export const NODES_LENGTH = 20;

const createNode = (col, row) => {
    return {
        col: col,
        row: row,
        isStart: false,
        isFinish: false,
        distance: 0,
        isVisited: false,
        isWall: false,
        isPath: false,
        path: []
    };
};

const createRandomStartPlace = (tempBoard, columnLength, nodesLength) => {
    const ranColumn = Math.floor(Math.random() * columnLength);
    const ranNode = Math.floor(Math.random() * nodesLength);
    tempBoard[ranColumn][ranNode].isStart = true;
    tempBoard[ranColumn][ranNode].isVisited = true;
    return tempBoard[ranColumn][ranNode];
}

const createRandomFinishPlace = (tempBoard, columnLength, nodesLength) => {
    const ranColumn = Math.floor(Math.random() * columnLength);
    const ranNode = Math.floor(Math.random() * nodesLength);
    if (tempBoard[ranColumn][ranNode].isStart) {
        createRandomFinishPlace(tempBoard, columnLength, nodesLength);
    }
    tempBoard[ranColumn][ranNode].isFinish = true;
}

export const createBoard = () => {
    const createdBoard = Array.apply(null, Array(COLUMN_LENGTH)).map(function (x, i) {
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


