
import './App.css';


import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';


function App() {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route exact path="/notes" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/signup" element={<Signup />} />

        </Routes>
        <Toaster  position="top-right" />
        </>
    );
}

export default App;
