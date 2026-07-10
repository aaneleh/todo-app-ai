import { useState } from "react";
import { useTasks } from "../../contexts/tasksContext";
import type { Task } from "../../@types/task";
import './styles.css'

const UpdateTask = ({trigger, setTrigger, id, description, date}) => {

  const { updateTask } = useTasks() as {updateTask: any};

  const [formData, setFormData] = useState({
    description: description,
    date: date
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

  return (
    <form onSubmit={handleSubmit} id="update-task-modal">
      <h3>Updating Task</h3>
      <div className="input-wrapper">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" placeholder="Description" onChange={handleChange} value={formData.description}/>
      </div>
      
      <div className="input-wrapper">
          <label htmlFor="date">Date</label>
          <input type="datetime-local" id="date" onChange={handleChange} value={formData.date}/>
      </div>

      <div className="buttons">
        <button onClick={handleClose} className="button grey-button">Fechar</button>
        <input type="submit" value="Submit" onChange={handleSubmit} className="button"/>
      </div>
    </form>
  )
}

export default UpdateTask
