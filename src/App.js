import logo from './logo.svg';
import './App.css';
import Nav from './components/NavigationWidget'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <div className="App container mx-auto px-40 py-10 mt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trending" element={<TrendingPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
