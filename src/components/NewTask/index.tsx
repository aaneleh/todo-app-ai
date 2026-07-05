import { useTasks } from "../../contexts/tasksContext"
import { useState } from "react"
import './styles.css'

function New() {

  const { createTask } = useTasks() as {createTask};

  const [formData, setFormData] = useState({
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTask({description: formData.description, date: new Date(formData.date)})
  }

  return (
      <form onSubmit={handleSubmit} id="new-task-form">
          <div className="input-wrapper">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" placeholder="Description" onChange={handleChange}/>
          </div>
          
          <div className="input-wrapper">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" onChange={handleChange}/>
          </div>

          <input type="submit" value="Submit" onChange={handleSubmit} className="button"/>
      </form>
  )
}

export default New
