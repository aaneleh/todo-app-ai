/* import { useTasksContext } from '../../contexts/tasksContext'
import {useState} from 'react';
 */
function Update(index : number) {

/*     const getTask = useTasksContext()

    const [ task, setTask ] = useState('');
 */

    return (
        <>
            <h2>Update task {index}</h2>
            <form>
                <label htmlFor="description">Description</label>
                <input type="text" id="description"/>

                <label htmlFor="date">Date:</label>
                <input type="date" id="date"/>

                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}

export default Update
