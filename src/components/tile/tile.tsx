import {Node} from "../../domain/node";

type TitleProps = {
    node: Node,
    click: any,
    hover: any

}

const Tile = ({node, click, hover}: TitleProps) => {

    const nodeStyle = {
        "borderStyle": "solid",
        "borderWidth": 1,
        "background": node.getBackground(),
        "height": 25,
        "width": 25,
    };


    return (
        <div className="title" style={nodeStyle} onClick={click} onMouseOver={hover}></div>
    )
}

export default Tile;
