import React, { useEffect } from 'react'
import axios from 'axios'
import './Create.css'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Heading, Input, Text} from '@chakra-ui/react'
import { animated, useTransition } from 'react-spring'
//https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo

function Create() {
    const[task, setTask] = React.useState<any>("")
    const[upd, setUpdate] = React.useState(false)
    const[id, setID] = React.useState("")
    const[complete, setComplete] = React.useState()
    const[del, setdelete] = React.useState(true)
    const[error, seterror] = React.useState(false)



    const transition = useTransition(del,{
        enter:{x:0, y:0, opacity:1},
        from:{x:500, y:0, opacity:1},
        leave: {x:0, y:0, opacity:1},
    })

    const[tasks, setTasks] = React.useState<any[]>([])

    React.useEffect( ()=> {   
        axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
        .then(response=>{
            console.log(response.data)
            setTasks([...response.data])
                
        })


    },[])
    async function Delete(i:any):Promise<any>{

        setID(id)
        setdelete(false)

        await  axios.delete("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo"+"/"+i)
          
          console.log(tasks) 
  
         await axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
          .then(response=>{
              console.log(response.data)
              setTasks([...response.data])
                  
  
  
          })
          setdelete(true)


          
       
      }
    async function UpdateData(i:any):Promise<any>{

        setID("")
        await  axios.put("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo"+"/"+i, {
  
          task,
          complete
  
  
          }).then(res=>{console.log(res)})
          
          console.log(tasks) 
  
         await axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
          .then(response=>{
              console.log(response.data)
              setTasks([...response.data])
                  
  
  
          })
      
          setUpdate(false)
          setTask("")
        


       
      }
    async function PostData():Promise<any>{

        if(task==""){seterror(true); return;} else{seterror(false) 
      await  axios.post("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo", {

        task,
        complete


        }).then(res=>{console.log(res)})
        
        console.log(tasks) 

       await axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
        .then(response=>{
            console.log(response.data)
            setTasks([...response.data])
                


        })
    
        setTask("")}


     
    }
 let current:String; 
    function Test(i:string){

        setdelete(true)
        setID(i)
        setUpdate(true)
    
    }
   async function Test1(i:string){

        
        await  axios.put("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo"+"/"+i, {
  
        complete:true


        }).then(res=>{console.log(res)})
        
        console.log(tasks) 

       await axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
        .then(response=>{
            console.log(response.data)
            setTasks([...response.data])
                


        })
    }

  return (

    <div className="d">


        <Container mt="20px" className = "f"   >

        <p><Input bg = "white"mt = "44px" value={task} onChange ={e=>{setTask(e.target.value)}} placeholder="Task" ></Input></p>

        <Button mb= "20px"width="30%" mt = "20px"ml="35%" onClick={()=>PostData()} >Create Task</Button>   {error ? <Text fontSize={'2xl'} color="red"> Please enter a Task</Text> : ""}
   </Container>
        {tasks.map((task)=>{


return(
<>
     <Container   flexDirection={'column-reverse'} className = "f" display="flex" >{transition((style,item)=> item && task.id!=id || upd ? <animated.div  style = {style}>

<Card  border= "1px"  mb= "20px"  bg = {task.complete  ? "green.200": '#e1bf92	'}  mt= "30px"  width = "auto" variant="filled" align='center'>

<Container><CardBody bg = {task.complete  ? "green.200": '#e1bf92	'}  >
<Container><Text    bg = {task.complete  ? "green.200": '#e1bf92	'}  >{task.task}</Text> </Container>
</CardBody></Container>
<CardFooter bg = {task.complete  ? "green.200": '#e1bf92	'} >
<Button colorScheme = "cyan"onClick={()=>{Test(task.id)}}>Update</Button>            

    <p>{upd && task.id == id ? <><Input bg="blue.200" onChange ={e=>{setTask(e.target.value)}} ></Input> <Button colorScheme = "green" onClick={()=>{UpdateData(task.id) }}>Save</Button></>: null} </p>  {upd && task.id == id ? null : <>{task.complete == true ? "":<p>  <Button  colorScheme = "green" onClick={()=>{Test1(task.id); task.complete=true;}}>Mark as Completed</Button> </p>}<p> <Button  colorScheme = "red" onClick={()=>{Delete(task.id)}}>Delete</Button></p></>}
</CardFooter>
</Card></animated.div>:null)} </Container>

   </>
             

    
        
)


})}


    </div>
  )
}


export default Create

