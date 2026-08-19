import { useEffect, useState } from "react";
import { useTasks } from "../../contexts/tasksContext";
import type { Task } from "../../@types/task";
import './styles.css'
import { useTranslation } from "react-i18next";

const UpdateTask = ({trigger, setTrigger, id, description, date}) => {

  const { t } = useTranslation();

  const { updateTask } = useTasks() as {updateTask: any};

  const [formData, setFormData] = useState({
    description: description,
    date: date.toISOString().slice(0, -8)
  });

  const handleChange = (e: { currentTarget: { id: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    updateTask({id:id, description: formData.description, date: new Date(formData.date)})
    setFormData({
      description: '',
      date: ''
    })
    setTrigger(false)
  }

  const handleClose = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setTrigger(false);
  }

  const handleOutsideClick = (e) => {
    if (e.target.id === "update-task-modal") {
      setTrigger(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div id="update-task-modal">
      <form onSubmit={handleSubmit} id="update-task-form">
        <h3> {t('tasks.updateModal')} </h3>
        <div className="input-wrapper">
            <label htmlFor="description"> {t('tasks.description')} </label>
            <input type="text" id="description" placeholder="Description" onChange={handleChange} value={formData.description}/>
        </div>
        
        <div className="input-wrapper">
            <label htmlFor="date">{t('tasks.date')} </label>
            <input type="datetime-local" id="date" onChange={handleChange} value={formData.date}/>
        </div>

        <div className="buttons">
          <button onClick={handleClose} className="grey-button">{t('tasks.close')} </button>
          <input type="submit" value={t('tasks.save')}  onChange={handleSubmit} className="button"/>
        </div>
      </form>
    </div>
  )
}

export default UpdateTask
