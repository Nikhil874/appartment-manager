import { useState } from "react"
import Button from '@mui/material/Button';
import axios from "axios";
import { useSelector } from "react-redux"
export const Addflats=()=>{
    const [flatdetails,setFlatdetails]=useState({
        block:"",
        flatNo:"",
        residentType:""

    })
    const [resident1,setResident1]=useState({
        name:"",
        age:"",
        gender:""
    })
    const  handleflatDetails1=(e)=>{
        console.log(e.target.value)
        const [name,value]=e.target;
        console.log(...flatdetails)
        setFlatdetails({...flatdetails,[name]:value});
    }
    function handleResident1(e){
        const [name,value]=e.target;
        setResident1({...resident1,[name]:value});
    }
    const _id =useSelector((store)=>store._id)
   async function handleAddflat(){
         await axios.post("http://localhost:3001/flats",{
             ...flatdetails,residents:[resident1],managerId:_id
         }).then((res)=>{
             console.log(res);
             alert("Sucessfully added")
         })
    }
    

    return(
        <>
        <h1>Add Flats</h1>
        <input type="text" placeholder="Block" name="block" onChange={(e)=>{handleflatDetails1(e)}}/>
        <br />
        <input type="number" placeholder="Flat no" name="flatNo" onChange={(e)=>{handleflatDetails1(e)}} />
        <br />
        <input type="text" placeholder="Resident Type" name="residentType" onChange={(e)=>{handleflatDetails1(e)}}/>
        <br />
        <h4>Resident 1:</h4>
        <input type="text" name="name" placeholder="enter name" onChange={(e)=>{handleResident1(e)}}/>
        <br />
        <input type="number" name="age" placeholder="enter age" onChange={(e)=>{handleResident1(e)}}/>
        <br />
        <input type="string" name="gender" placeholder="enter gender" onChange={(e)=>{handleResident1(e)}}/>
        <br />
        <Button variant="contained" onClick={handleAddflat}>Submit</Button>
        </>
    )
}