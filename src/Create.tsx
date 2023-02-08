import React, { useEffect } from 'react'
import axios from 'axios'
import { Box, Button, Container, Input } from '@chakra-ui/react'
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
    async function Delete(i:any):Promise<any>{

        await  axios.delete("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo"+"/"+i)
          
          console.log(tasks) 
  
         await axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
          .then(response=>{
              console.log(response.data)
              setTasks([...response.data])
                  
  
  
          })
      
          
       
      }
    async function UpdateData(i:any):Promise<any>{

        await  axios.put("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo"+"/"+i, {
  
          task
  
  
          }).then(res=>{console.log(res)})
          
          console.log(tasks) 
  
         await axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
          .then(response=>{
              console.log(response.data)
              setTasks([...response.data])
                  
  
  
          })
      
          setUpdate(false)
          
       
      }
    async function PostData():Promise<any>{

      await  axios.post("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo", {

        task


        }).then(res=>{console.log(res)})
        
        console.log(tasks) 

       await axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
        .then(response=>{
            test = response.data
            console.log(response.data)
            setTasks([...response.data])
                


        })
    

        
     
    }
 

  return (

    <div>


        <Container >

        <p><Input mt = "44px" onChange ={e=>{setTask(e.target.value)}} placeholder="Task" ></Input></p>

        <Button width="30%" mt = "20px"ml="35%" onClick={()=>PostData()} >Add</Button>    </Container>
        {tasks.map((task)=>{


return(

        <>
             <Container display='flex' ><Box fontSize="20px" mt="20px" border = "1px" >
            <p>{task.task}</p> 
            
            <Button  onClick={()=>{Delete(task.id)}}>Delete</Button>
            
            
            <Button onClick={()=>{setUpdate(true)}}>Update</Button>
            {upd ? <><Input onChange ={e=>{setTask(e.target.value)}} ></Input> <Button onClick={()=>{UpdateData(task.id)}}>Save</Button></>: null}</Box></Container>

        </>
        
)


})}


    </div>
  )
}


export default Create

