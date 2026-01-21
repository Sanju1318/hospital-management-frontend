import './App.css';
import Siterouter from './components/siterouter';

import Navbar from './components/navbar';
import Adminnavbar from './components/addminnavbar';
import Footer from './footer';

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
    <Navbar
      {/* Navbar only when logged in */}
      {token && (role === "ADMIN" ? <Adminnavbar /> : <Navbar />)}

      <Siterouter />

      {token && <Footer />}
    </>
  );
}

export default App;
