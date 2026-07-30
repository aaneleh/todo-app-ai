import { Link, useLocation } from "react-router";
import { FiHome, FiList, FiMessageCircle, FiSettings } from "react-icons/fi";
import "./styles.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Navbar() {

  const BASE_URL = "todo-app-ai";

  const location = useLocation();

  const { t } = useTranslation();

  const [ AI ] = useState(JSON.parse(localStorage.getItem('AI')));

  return (
    <aside id="navbar">
      <Link to={`${BASE_URL}/`} className={location.pathname == `${BASE_URL}/` ? 'active' : ''}> 
        <FiHome/> {t('menu.home')} 
      </Link>

      <Link to={`${BASE_URL}/all`} className={location.pathname == `${BASE_URL}/all` ? 'active' : ''}> 
        <FiList/> {t('menu.all')} 
      </Link>

      { AI.chat && 
        <Link to={`${BASE_URL}/chat`} className={location.pathname == `${BASE_URL}/chat` ? 'active' : ''}> 
          <FiMessageCircle/> {t('menu.chat')} 
        </Link>  
      }
      
      <Link to={`${BASE_URL}/settings`} className={location.pathname == `${BASE_URL}/settings` ? 'active' : ''}>  
        <FiSettings/> {t('menu.settings')} 
      </Link>
    </aside>
  )
}

export default Navbar