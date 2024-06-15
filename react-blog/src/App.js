import BlogDetails from './components/BlogDetails';
import Create from './components/Create';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
function App() {

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
