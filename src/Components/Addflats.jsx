import { useState } from "react"
import Button from '@mui/material/Button';
import axios from "axios";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

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
    const [resident2,setResident2]=useState({
        name:"",
        age:"",
        gender:""
    })
    const  handleflatDetails1=(e)=>{
        console.log(e.target.value)
        const {id,value}=e.target;
        // console.log(...flatdetails)
        setFlatdetails({...flatdetails,[id]:value});
    }
    function handleResident1(e){
        const {name,value}=e.target;
        setResident1({...resident1,[name]:value});
    }
    function handleResident2(e){
        const {name,value}=e.target;
        setResident2({...resident2,[name]:value});
    }
    const _id =useSelector((store)=>store._id)
   async function handleAddflat(){
         await axios.post("https://appartment-server.herokuapp.com/flats",{
             ...flatdetails,residents:[resident1,resident2],managerId:_id
         }).then((res)=>{
             console.log(res);
             alert("Sucessfully added")
         })
    }
    
    let navigate=useNavigate();
    function handleHome(){
    navigate("/")
    }
    function handleLogining(){
        navigate("/login")
        }
    return(
        <>
        {_id? <Button variant="contained" onClick={handleHome}>Home</Button>:<Button variant="contained" onClick={handleLogining}>Login/SignUp</Button>}
     
        <h1>Add Flats</h1>
        <input type="text" placeholder="Block" id="block" onChange={(e)=>{handleflatDetails1(e)}}/>
        <br />
        <input type="number" placeholder="Flat no" id="flatNo" onChange={(e)=>{handleflatDetails1(e)}} />
        <br />
        <input type="text" placeholder="Resident Type" id="residentType" onChange={(e)=>{handleflatDetails1(e)}}/>
        <br />
        <h4>Resident 1:</h4>
        <input type="text" name="name" placeholder="enter name" onChange={(e)=>{handleResident1(e)}}/>
        <br />
        <input type="number" name="age" placeholder="enter age" onChange={(e)=>{handleResident1(e)}}/>
        <br />
        <input type="string" name="gender" placeholder="enter gender" onChange={(e)=>{handleResident1(e)}}/>
        <br />
        {/* <Button variant="contained" onClick={handleAddflat}>Submit</Button> */}
{/* 
        <br /> */}
        <h4>Resident 2:</h4>
        <input type="text" name="name" placeholder="enter name" onChange={(e)=>{handleResident2(e)}}/>
        <br />
        <input type="number" name="age" placeholder="enter age" onChange={(e)=>{handleResident2(e)}}/>
        <br />
        <input type="string" name="gender" placeholder="enter gender" onChange={(e)=>{handleResident2(e)}}/>
        <br />
        <Button variant="contained" onClick={handleAddflat}>Submit</Button>
        </>
    )
}