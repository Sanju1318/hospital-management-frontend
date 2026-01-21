import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Siterouter from './components/siterouter';
import Navbar from './components/navbar';
import Adminnavbar from './components/addminnavbar';
import Footer from './footer';

function App() {
  // ✅ token/role from localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      {/* Navbar only when logged in */}
      {token && (role === "ADMIN" ? <Adminnavbar /> : <Navbar />)}

      <Siterouter />

      {token && <Footer />}
    </Router>
  );
}

export default App;
