const Tile = ({node, click, hover}) => {

    const backgroundColorSetter = (node) => {
        if (node.isVisited && node.isStart) return "red";
        if (node.isVisited && node.isFinish) return "black";
        if (node.isPath) return "yellow";
        if (node.isVisited) return "lime";
        if (node.isStart) return "red";
        if (node.isFinish) return "black";
        if (node.isWall) return "gray";
        return "white";
    }

    const nodeStyle = {
        "borderStyle": "solid",
        "borderWidth": 1,
        "background": backgroundColorSetter(node),
        "height": 25,
        "width": 25,
    };


    return (
        <div className="title" style={nodeStyle} onClick={click} onMouseOver={hover}></div>
    )
}

export default Tile;
