import logo from './logo.svg';
import './App.css';
import NavigationComponent from './components/NavigationComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';

function App() {
  return (
    <>
      <Router>
        <NavigationComponent />
        <div className="App container mx-auto px-4 sm:px-4 md:px-8 lg:px-40 py-10 mt-16">
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
