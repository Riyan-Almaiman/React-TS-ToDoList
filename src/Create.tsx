import React, { useEffect } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Heading, Input, Text} from '@chakra-ui/react'
//https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo

function Create() {
    const[task, setTask] = React.useState<any>()
    const[upd, setUpdate] = React.useState(false)
    const[id, setID] = React.useState("")
    const[complete, setComplete] = React.useState(false)

    const[tasks, setTasks] = React.useState<any[]>([])

    React.useEffect( ()=> {   
        axios.get("https://63e208d4ad0093bf29c65b2d.mockapi.io/ToDo")
        .then(response=>{
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
            console.log(response.data)
            setTasks([...response.data])
                


        })
    

        
     
    }
 let current:String; 
    function Test(i:string){
        
        setID(i)
        setUpdate(true)
    
    }
    function Test1(i:string){
        
        setID(i)
        setComplete(true)
    
    }

  return (

    <div>


        <Container >

        <p><Input mt = "44px" onChange ={e=>{setTask(e.target.value)}} placeholder="Task" ></Input></p>

        <Button width="30%" mt = "20px"ml="35%" onClick={()=>PostData()} >Add a Task</Button>    </Container>
        {tasks.map((task)=>{


return(

    <Container display="flex" >

        <Card  display="flex"  bg = {complete && task.id == id ? "green.300": 'gray.300'}  mt= "30px" display="flex" width = "300px" variant="filled" align='center'>
   
  <CardBody>
    <Text isTruncated >{task.task}</Text>
  </CardBody>
  <CardFooter>
  <Button colorScheme = "cyan"onClick={()=>{Test(task.id)}}>Update</Button>            

            <p>{upd && task.id == id ? <><Input bg="blue.200" onChange ={e=>{setTask(e.target.value)}} ></Input> <Button colorScheme = "green" onClick={()=>{UpdateData(task.id)}}>Save</Button></>: null} </p>  <p> <Button  colorScheme = "green" onClick={()=>{Test1(task.id)}}>Mark as Completed</Button> </p><p> <Button  colorScheme = "red" onClick={()=>{Delete(task.id)}}>Delete</Button></p>
  </CardFooter>
</Card> </Container>
             

    
        
)


})}


    </div>
  )
}


export default Create

