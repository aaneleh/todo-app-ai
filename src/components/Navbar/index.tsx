import { Link } from "react-router";
import { FiHome, FiList, FiMessageCircle, FiSettings } from "react-icons/fi";
import "./styles.css";
import { useEffect, useState } from "react";

function Navbar() {

  const [ AI, setAI ] = useState({
    chat: false,
    summary: false,
    suggestions: false
  });

  useEffect(() => {
    if(localStorage.getItem('AI')) setAI(JSON.parse(localStorage.getItem('AI')))
  },[])

  return (
    <aside id="navbar">
      <Link to="/"> <FiHome/> Home</Link>
      <Link to="/all"> <FiList/> All</Link>
      { AI.chat && <Link to="/chat"> <FiMessageCircle/>Chat</Link>  }
      
      <Link to="/settings"> <FiSettings/>Settings</Link>
    </aside>
  )
}

export default Navbar