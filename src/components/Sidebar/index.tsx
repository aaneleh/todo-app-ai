import { Link } from "react-router";
import { FiHome, FiList, FiPlusCircle, FiSettings } from "react-icons/fi";
import "./styles.css";

function Sidebar() {

  return (
    <aside id="sidebar">
      <Link to="/"> <FiHome/> Home</Link>
      <Link to="/all"> <FiList/> All</Link>
      <Link to="/new"> <FiPlusCircle/> New</Link>
      <Link to="/settings"> <FiSettings/>Settings</Link>
    </aside>
  )
}

export default Sidebar