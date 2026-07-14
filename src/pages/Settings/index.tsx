import { useEffect, useState } from 'react';
import './styles.css';
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: 'English' },
  pt: { nativeName: 'Português' }
};

function Settings() {

  const { t, i18n } = useTranslation();

  const [ theme, setTheme ] = useState<string>();

  useEffect(() => {
    setTheme(localStorage.getItem('theme')?.toString())
  },[])

  const handleTheme = (e) => {
    if(e.target.id === 'light' || e.target.id === 'dark') {
      localStorage.setItem('theme', e.target.id);
      setTheme(e.target.id)
    } 
  }

  return (
    <section id="settings">
      <h2>{t('menu.settings')}</h2>



      <div className="input-wrapper">
        <h4 className="input-title">Idioma</h4>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
{/*         <select name="language" id="language">
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
        </select> */}
      </div>

      <div className="input-wrapper">
        <h4 className="input-title">Tema</h4>

        <label htmlFor="light" className="radio-label" onClick={handleTheme}>
          <div className="radio-wrapper">
            <input type="radio" name="theme" id="light" checked={theme == 'light'}/>
            <span className="custom-radio"></span>
          </div>
          Claro
        </label>

        <label htmlFor="dark" className="radio-label" onClick={handleTheme}>
          <div className="radio-wrapper">
            <input type="radio" name="theme" id="dark" checked={theme == 'dark'}/>
            <span className="custom-radio"></span>
          </div>
          Escuro
        </label>
      </div>

      <div className="input-wrapper">
        <h4 className="input-title">IA</h4>
        <label htmlFor="chat" className="checkbox-label">
          <div className="checkbox-wrapper">
            <input type="checkbox" name="chat" id="chat"/>
            <span className="custom-checkbox"></span>
          </div>
          Chat
        </label>
      </div>

      <div className="buttons">
        <button>Salvar</button>
      </div>
    </section>
  )
}

export default Settings