
import './App.css';
import Home from './Home';
import CreateNote from './CreateNote';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
        </Routes>
    );
}

export default App;
