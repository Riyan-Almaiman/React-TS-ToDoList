import React, { useEffect } from 'react'
import axios from 'axios'
//https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo

function Create() {
    const[task, setTask] = React.useState<any>()
    const[upd, setUpdate] = React.useState(false)

    const[id, setID] = React.useState("")
    let test:any=[]

    const[tasks, setTasks] = React.useState<any[]>([])

    React.useEffect( ()=> {   
        axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
        .then(response=>{
            test = response.data
            console.log(response.data)
            setTasks([...response.data])
                


        })




    },[])
    async function PostData():Promise<any>{

        axios.post("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo", {

        task


        }).then(res=>{console.log(res)})
        
        console.log(tasks) 

        axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
        .then(response=>{
            test = response.data
            console.log(response.data)
            setTasks([...response.data])
                


        })
    

        
     
    }
 

  return (

    <div>




        <p><input onChange ={e=>{setTask(e.target.value)}} placeholder="Task" ></input></p>

        <button onClick={()=>PostData()} >Add</button>    
        {tasks.map((task)=>{
            let update=false


return(

        <>

            <p>{task.task}</p> <button>Delete</button><button onClick={()=>{setUpdate(true)}}>Update</button>
            {upd ? <><input></input> <button onClick={()=>{setUpdate(false)}}>Save</button></>: null}

        </>
        
)


})}


    </div>
  )
}


export default Create

