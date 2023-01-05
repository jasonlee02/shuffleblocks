import './App.css';
import Blockset from './components/blockset.component';

function App() {
    let values = [1, 2, 3, 4, 5]
    return (
        <div id = "App">
            <Blockset values = {values}/>
        </div>
    );
}

export default App;
