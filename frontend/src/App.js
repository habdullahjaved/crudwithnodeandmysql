import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import Add from './components/Add';
import Update from './components/Update';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
