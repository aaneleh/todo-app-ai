import { useTasks } from "../../contexts/tasksContext"
import { useState } from "react"
import './styles.css'
import { useTranslation } from "react-i18next";

function New() {

  const { t } = useTranslation();

  const { createTask } = useTasks() as {createTask: any};

  const [formData, setFormData] = useState({
    description: '',
    date: ''
  });

  const handleChange = (e: { currentTarget: { id: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    createTask({description: formData.description, date: new Date(formData.date)})
    setFormData({
      description: '',
      date: ''
    })
  }

  return (
      <form onSubmit={handleSubmit} id="new-task-form">
          <div className="input-wrapper">
            <label htmlFor="description"> {t("tasks.description")} </label>
            <input type="text" id="description" placeholder="Description" onChange={handleChange} value={formData.description}/>
          </div>
          
          <div className="input-wrapper">
            <label htmlFor="date"> {t("tasks.date")} </label>
            <input type="datetime-local" id="date" onChange={handleChange} value={formData.date}/>
          </div>

          <input type="submit" value={t("tasks.submit")} onChange={handleSubmit} className="button"/>
      </form>
  )
}

export default New
