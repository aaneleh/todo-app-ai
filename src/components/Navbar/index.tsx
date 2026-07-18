import { Link } from "react-router";
import { FiHome, FiList, FiMessageCircle, FiSettings } from "react-icons/fi";
import "./styles.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Navbar() {

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
      <Link to="/"> <FiHome/> {t('menu.home')} </Link>
      <Link to="/all"> <FiList/> {t('menu.all')} </Link>
      { AI.chat && <Link to="/chat"> <FiMessageCircle/> {t('menu.chat')} </Link>  }
      
      <Link to="/settings"> <FiSettings/> {t('menu.settings')} </Link>
    </aside>
  )
}

export default Navbar