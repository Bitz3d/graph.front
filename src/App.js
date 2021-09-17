import './App.css';
import {Component} from "react";
import Playground from "./components/playground/Playground";
import Board from "./components/board/Board";


class App extends Component {
    render() {
        return (
            <div>
                {/*<Board/>*/}
                <Playground/>
            </div>
        );
    }
}

export default App;



