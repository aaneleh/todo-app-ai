import { useEffect, useState, type SetStateAction } from 'react';
import './styles.css';
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: 'English' },
  pt: { nativeName: 'Português' }
};

function Settings() {

  const { t, i18n } = useTranslation();

  const [ language, setLanguage ] = useState();
  const [ theme, setTheme ] = useState<string>();
  const [ AI, setAI ] = useState({
    chat: true,
    summary: true,
    suggestions: true
  });

  useEffect(() => {
    setTheme(localStorage.getItem('theme')?.toString())
    if(localStorage.getItem('AI')) setAI(JSON.parse(localStorage.getItem('AI')))
  },[])

  const handleTheme = (e: { target: { id: SetStateAction<string | undefined>; }; }) => {
    if(e.target.id === 'light' || e.target.id === 'dark') {
      setTheme(e.target.id)
    } 
  }

  const handleLanguage = (e: { target: { value: string | undefined; }; }) => {
    setLanguage(e.target.value)
  }

  const handleAI = (e) => {
    setAI({
      ...AI,
      [e.target.id]: e.target.checked,
    })
  }

  const handleSave = (e) => {
    if(theme !== undefined) {
      localStorage.setItem('theme', theme);
      if(theme === "dark") document.documentElement.classList.add("dark")
      if(theme === "light") document.documentElement.classList.remove("dark")
    }
    localStorage.setItem('AI', JSON.stringify(AI));
    i18n.changeLanguage(language)
  }

  return (
    <section id="settings">
      <h2>{t('settings.title')}</h2>

      <div className="input-wrapper">
        <h4 className="input-title">{t('settings.subtitleLanguage')}</h4>
        <select name="language" id="language" onChange={handleLanguage}>
          {
            Object.keys(lngs).map((lng) => (
              <option key={lng} value={lng}> 
                {lngs[lng].nativeName} 
              </option>
            ))
          }
        </select>
      </div>

      <div className="input-wrapper">
        <h4 className="input-title">{t('settings.subtitleTheme')}</h4>

        <label htmlFor="light" className="radio-label" onChange={handleTheme}>
          <div className="radio-wrapper">
            <input type="radio" name="theme" id="light" checked={theme == 'light'}/>
            <span className="custom-radio"></span>
          </div>
          {t('settings.themeLight')}
        </label>

        <label htmlFor="dark" className="radio-label" onChange={handleTheme}>
          <div className="radio-wrapper">
            <input type="radio" name="theme" id="dark" checked={theme == 'dark'}/>
            <span className="custom-radio"></span>
          </div>
          {t('settings.themeDark')}
        </label>
      </div>

      <div className="input-wrapper">
        <h4 className="input-title">{t('settings.subtitleAI')}</h4>

        <label htmlFor="chat" className="checkbox-label">
          <div className="checkbox-wrapper">
            <input type="checkbox" name="chat" id="chat" onChange={handleAI} checked={AI.chat}/>
            <span className="custom-checkbox"></span>
          </div>
          {t('settings.AIChat')}
        </label>
        <label htmlFor="summary" className="checkbox-label">
          <div className="checkbox-wrapper">
            <input type="checkbox" name="summary" id="summary" onChange={handleAI} checked={AI.summary}/>
            <span className="custom-checkbox"></span>
          </div>
          {t('settings.AISummary')}
        </label>
        <label htmlFor="suggestions" className="checkbox-label">
          <div className="checkbox-wrapper">
            <input type="checkbox" name="suggestions" id="suggestions" onChange={handleAI} checked={AI.suggestions}/>
            <span className="custom-checkbox"></span>
          </div>
          {t('settings.AISuggestions')}
        </label>
      </div>

      <div className="buttons">
        <button className="button" onClick={handleSave}>{t('settings.save')}</button>
      </div>
    </section>
  )
}

export default Settings