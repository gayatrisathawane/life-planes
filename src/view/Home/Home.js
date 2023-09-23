import './Home.css';
import './../../index.css';
import Task from '../../component/Task/Task';
import showToast from 'crunchy-toast';
import Footer from '../../component/Footer/Footer';
import { useEffect, useState } from 'react';

const Home = () => {
    const [id, setId] = useState(0)
    const [tittle, setTittle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [isEdit, setEdit] = useState(false)

    const [tasklist, setTaskList] = useState([
        {
            id: 1,
            tittle: "submit assignment",
            description: "kjdjka jhdjkh kajsdh",
            priority: "  Very high"
        }


    ])



    const addtoplan = () => {



        let randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id: randomId,
            tittle: tittle,
            description: description,
            priority: priority
        }
        if (checkField() === false) {
            return ;
        }


        const newarraylist = [...tasklist, obj]
        setTaskList(newarraylist)

        inputfield();

        savetolocalStorage(newarraylist);
        showToast('Task added  successfully', 'success', 3000);




    }

    const removeTaskList = (id) => {
        let index;
        tasklist.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }
        })

        const tempArray = tasklist;
        tempArray.splice(index, 1)

        console.log(id)

        setTaskList([...tempArray])

        savetolocalStorage(tempArray);

        showToast('Deleted task successfully', 'alert', 3000);
    }







    const savetolocalStorage = (task) => {
        localStorage.setItem('lifeplanner', JSON.stringify(task))
    }






    const setTaskEditable = (id) => {
        setEdit(true)
        setId(id);
        let currentEditTask;
        tasklist.forEach((task) => {
            if (task.id === id) {
                currentEditTask = task;

            }
        })

        setTittle(currentEditTask.tittle)
        setDescription(currentEditTask.description)
        setPriority(currentEditTask.priority)




    }
    const updateTask = () => {
        let indexToupdate;
        tasklist.forEach((task, i) => {
            if (task.id === id) {
                indexToupdate = i;
            }
        })
        const tempArray = tasklist;
        tempArray[indexToupdate] = {
            id: id,
            tittle: tittle,
            description: description,
            priority: priority
        }


        if (checkField() === false) {
            return;
        }
        setTaskList([...tempArray])

        savetolocalStorage(tempArray)
        setId(0);
        inputfield();

        setEdit(false)

        showToast('update task successfully', 'info', 2000);

    }

    const inputfield = () => {
        setDescription('');
        setPriority('');
        setTittle('');

    }

    const checkField = () => {
        if (!tittle) {
            showToast('Title is required', 'alert', 2000)
            return false;
        }
        if (!priority) {
            showToast('priority is required', 'alert', 2000)
            return false;
        }
        if (!description) {
            showToast('description is required', 'alert', 2000)
            return false;
        }
        return true;
    }




    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('lifeplanner'));

        if (list && list.length > 0) {
            setTaskList(list)
        }
    }, [])



    return (
        <div className='container'>
            <div className='tittle-project'>
                <h1 className='' >LIFE PLANS 📝 </h1>
            </div>
            <div className='flex-box-container'>
                <div >
                    <h2 className='taskheading'>Task List</h2>
                    <div className='task-list-container'>

                        {
                            tasklist.map((taskitem, index) => {

                                const { id, tittle, description, priority } = taskitem;

                                return <Task
                                    id={id}
                                    tittle={tittle}
                                    description={description}
                                    priority={priority}
                                    key={index}
                                    removeTaskList={removeTaskList}
                                    setTaskEditable={setTaskEditable}
                                />
                            })

                        }
                    </div>

                </div>

                <div>
                    <h2 className='taskheading'>{isEdit ? `Update plan ` : 'Add plans'}</h2>

                    <div>

                        <form>
                            <input type='text' className='inputf' placeholder='Enter a tittle' value={tittle} onChange={(e) => {
                                setTittle(e.target.value)
                            }} /><br />
                            <input type='text' className='inputf' placeholder='Enter a description' value={description} onChange={(e) => {
                                setDescription(e.target.value)
                            }} /> <br />

                            <input type='text' className='inputf' placeholder='Enter a priority' value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value)
                                }} /><br />



                            {/* <div>
                    {isEdit? <button type='button' className='btntask'  onClick={updateTask}
                   >Update Task 🖊</button>:<button type='button' 
                   className='btntask'  onClick={addtoplan}
                   >Add Life Plane ✔</button>}
                </div> */}


                            <div>

                                <button className='btntask' type='button' onClick={() => {
                                    isEdit ? updateTask() : addtoplan()
                                }}>

                                    {isEdit ? 'Update Task 🖊' : 'Add Life Plan ✔'}

                                </button>

                            </div>



                        </form>

                    </div>
                </div>



            </div>
              <Footer/>
          
        </div>
      
    )
}
export default Home;