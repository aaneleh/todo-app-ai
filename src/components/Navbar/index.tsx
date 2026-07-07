import { Link } from "react-router";
import { FiHome, FiList, FiSettings } from "react-icons/fi";
import "./styles.css";

function Navbar() {

  return (
    <aside id="navbar">
      <Link to="/"> <FiHome/> Home</Link>
      <Link to="/all"> <FiList/> All</Link>
      <Link to="/settings"> <FiSettings/>Settings</Link>
    </aside>
  )
}

export default Navbar