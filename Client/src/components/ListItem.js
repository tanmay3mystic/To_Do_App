import React, {useState } from 'react'
import "./ListItem.css"

function ListItem({item , id , deleteI, saveI}) {
    const [editFlag , setEditFlag] = useState(false);
    const [editTask , setEditTask] = useState(item.task);
    const [editTime , setEditTime] = useState(item.time);
    const [editDate , setEditDate] = useState(item.date)
    const [editChecked , setEditChecked] = useState(false);

    const toggleChange=(e)=>{
        setEditChecked(!editChecked);
        let newItem = { checked: !editChecked };
        saveI(newItem , id)
        return
    }

    const saveHandle = ()=>{
        let newItem = {
            task : editTask , 
            time : editTime,
            date : editDate,
            checked : editChecked
        }
        saveI(newItem , id);
        setEditFlag(false)
        return
    }

    return (
    <>
        <div>
            <input type="checkbox" className="checkBox" onChange={toggleChange} value={editChecked}  />
        </div>
        <div className="task" >
            {
                editFlag?<>
                    <div > <input  type="text" id="taskC"  onChange={(e)=>setEditTask(e.target.value)} value={editTask} />  </div>
                    <div > <input  type="time" id="timeC" onChange={(e)=>setEditTime(e.target.value)} value={editTime}  />  </div>
                    <div > <input type="Date"  id ="dateC" onChange={(e)=>setEditDate(e.target.value)} value={editDate}  /> </div>
                </> :<>
                    <div id="txt1" >{item.task}</div>
                    <div id="txt2">{item.time}</div>
                    <div id="txt3">{item.date}</div>
                </>
            }
            
        </div>
        <div className="list-buttons" >
       { editFlag?<>
                <button type="button" disabled={!editTask&& !editTime&& !editDate} onClick={saveHandle} >Save</button>
                </> :<>
                <button type="button" onClick={()=>setEditFlag(true)} >Edit</button>
                <button type="button" onClick={()=>deleteI(id)} >Delete</button>
                </>}
        </div>
    </>
    )
}

export default ListItem
