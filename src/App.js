
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Component/About';
import Home from './Component/Home';
import NavBar from './Component/NavBar';
import NotesState from './Context/NotesState';

function App() {
  return (
    <>
      <NotesState>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
