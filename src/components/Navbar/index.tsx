import { Link, useLocation } from "react-router";
import { FiHome, FiList, FiMessageCircle, FiSettings } from "react-icons/fi";
import "./styles.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Navbar() {

  const location = useLocation();

  const { t } = useTranslation();

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
      <Link to="/" className={location.pathname == "/" ? 'active' : ''}> 
        <FiHome/> {t('menu.home')} 
      </Link>

      <Link to="/all" className={location.pathname == "/all" ? 'active' : ''}> 
        <FiList/> {t('menu.all')} 
      </Link>

      { AI.chat && 
        <Link to="/chat" className={location.pathname == "/chat" ? 'active' : ''}> 
          <FiMessageCircle/> {t('menu.chat')} 
        </Link>  
      }
      
      <Link to="/settings" className={location.pathname == "/settings" ? 'active' : ''}>  
        <FiSettings/> {t('menu.settings')} 
      </Link>
    </aside>
  )
}

export default Navbar