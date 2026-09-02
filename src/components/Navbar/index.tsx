import { Link, useLocation } from "react-router";
import { FiHome, FiList, FiMessageCircle, FiSettings } from "react-icons/fi";
import "./styles.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from '../../assets/logo.svg';
import LogoDrk from '../../assets/logoDrk.svg';

function Navbar() {

  const location = useLocation();
  const { t } = useTranslation();
  const [ AI ] = useState(JSON.parse(localStorage.getItem('AI')));
  
  const [ theme, setTheme ] = useState("light");

  useEffect(() => {
    let local = localStorage.getItem('theme')?.toString();
    if(local !== undefined) {
      setTheme(local);

    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
    }
  },[])
  
  return (
    <aside id="navbar">
      <Link to={`/ `} className={'logo'}> 
        <img src=
        { (theme === 'dark')
          ?  Logo : LogoDrk
        } 
        alt="todo-app"/> 
      </Link>

      <Link to={`/ `} className={`link ${location.pathname == `/` ? 'active' : ''}`}> 
        <FiHome/> {t('menu.home')} 
      </Link>

      <Link to={`/all`} className={`link ${location.pathname == `/all` ? 'active' : ''}`}> 
        <FiList/> {t('menu.all')} 
      </Link>

      { AI.chat && 
        <Link to={`/chat`} className={`link ${location.pathname == `/chat` ? 'active' : ''}`}> 
          <FiMessageCircle/> {t('menu.chat')} 
        </Link>  
      }
      
      <Link to={`/settings`} className={`link ${location.pathname == `/settings` ? 'active' : ''}`}>  
        <FiSettings/> {t('menu.settings')} 
      </Link>
    </aside>
  )
}

export default Navbar