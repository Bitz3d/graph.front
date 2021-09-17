import {NodeMode} from "../../domain/node";

const Tile = ({node, click, hover}) => {

    function getBackground() {

        // eslint-disable-next-line default-case
        switch (node.mode) {
            case NodeMode.START:
                return "red";
            case NodeMode.FINISH:
                return "black"
            case NodeMode.WALL:
                return "gray"
            case NodeMode.PATH:
                return "yellow"
            case NodeMode.GROUND:
                return node.isVisited ? "lime" : "white";


        }
    }

    const nodeStyle = {
        "borderStyle": "solid",
        "borderWidth": 1,
        "background": getBackground(),
        "height": 25,
        "width": 25,
    };


    return (
        <div className="title" style={nodeStyle} onClick={click} onMouseOver={hover}></div>
    )
}

export default Tile;
