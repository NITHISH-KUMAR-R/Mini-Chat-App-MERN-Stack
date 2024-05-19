import Login from './Login/login'
import Timeline from './Home/timeline'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/timeline" element={<Timeline />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
