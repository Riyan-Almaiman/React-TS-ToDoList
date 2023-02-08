import React, { useEffect } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Heading, Input, Text} from '@chakra-ui/react'
import { animated, useTransition } from 'react-spring'
//https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo

function Create() {
    const[task, setTask] = React.useState<any>()
    const[upd, setUpdate] = React.useState(false)
    const[id, setID] = React.useState("")
    const[complete, setComplete] = React.useState()
    const[del, setdelete] = React.useState(true)

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
        


       
      }
    async function PostData():Promise<any>{

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
    

        
     
    }
 let current:String; 
    function Test(i:string){
        setdelete(true)
        setID(i)
        setUpdate(true)
    
    }
   async function Test1(i:string){
        
        
        await  axios.put("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo"+"/"+i, {
  
        task,
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

    <div>


        <Container >

        <p><Input mt = "44px" onChange ={e=>{setTask(e.target.value)}} placeholder="Task" ></Input></p>

        <Button width="30%" mt = "20px"ml="35%" onClick={()=>PostData()} >Add a Task</Button>    </Container>
        {tasks.map((task)=>{


return(
<>
     <Container  flex="wrap"display="flex" >{transition((style,item)=> item && task.id!=id || upd ? <animated.div style = {style}>

<Card  display="flex"  bg = {task.complete  ? "green.300": 'gray.300'}  mt= "30px"  width = "auto" variant="filled" align='center'>

<CardBody>
<Text >{task.task}</Text>
</CardBody>
<CardFooter>
<Button colorScheme = "cyan"onClick={()=>{Test(task.id)}}>Update</Button>            

    <p>{upd && task.id == id ? <><Input bg="blue.200" onChange ={e=>{setTask(e.target.value)}} ></Input> <Button colorScheme = "green" onClick={()=>{UpdateData(task.id) }}>Save</Button></>: null} </p>  {upd && task.id == id ? null : <><p> <Button  colorScheme = "green" onClick={()=>{Test1(task.id); task.complete=true;}}>Mark as Completed</Button> </p><p> <Button  colorScheme = "red" onClick={()=>{Delete(task.id)}}>Delete</Button></p></>}
</CardFooter>
</Card></animated.div>:null)} </Container>

   </>
             

    
        
)


})}


    </div>
  )
}


export default Create

