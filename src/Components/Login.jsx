import Button from '@mui/material/Button';
import axios from "axios"
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getLogin, toggleLoading } from '../loginDetails/action';
import {  useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
export const LoginPage=()=>{
    
    const navigate=useNavigate();
    let dispatch=useDispatch();
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const [user1,setUser1]=useState({
        email:"",
        password:""
    })
    function handleChange(e){
        let {id,value}=e.target;
        setUser({...user,[id]:value})
    }
    function handleChange1(e){
        // console.log(e.target.value)
        let {name,value}=e.target;
        setUser1({...user1,[name]:value})
    }
    function handleSignUp(){
        dispatch(toggleLoading(true))
     axios.post("https://appartment-server.herokuapp.com/users/register",user).then((res)=>{
        console.log(res.data.user._id);
        dispatch(getLogin(res.data.user._id))
        dispatch(toggleLoading(false));
         alert("registered sucessfully")
         setUser({
            email:"",
            password:""
         })
         navigate("/addFlats")
     }).catch((err)=>{console.log(err)
        dispatch(toggleLoading(false));
    alert("User Alreay Exist Please Login")
    setUser({
        email:"",
        password:""
     })
    })
    }


    function handleLogin(){
        dispatch(toggleLoading(true))
        axios.post("https://appartment-server.herokuapp.com/users/login",user1).then((res)=>{
            console.log(res.data.user._id);
            dispatch(getLogin(res.data.user._id))
            dispatch(toggleLoading(false))
            alert("LoggedIn sucessfully")
            setUser1({
               email:"",
               password:""
            })
            navigate("/")
        }).catch((err)=>{console.log(err);
            dispatch(toggleLoading(false));
       alert("Invalid Credentials")
       setUser1({
           email:"",
           password:""
        })
       })
       }
       let loading =useSelector((store)=>store.loading);
    return(
        <>
        
      {loading?<CircularProgress color="secondary"/>:
      <>
      <h2>SignUp</h2>
      {/* <button onClick={()=>setLoading(loading?false:true)}>Loading</button>  */}
   <input type="text" placeholder="Enter Email" id='email' value={user.email} onChange={(e)=>{handleChange(e)}} />
   <br />
   <input type="password" placeholder="Password" id='password' value={user.password} onChange={(e)=>{handleChange(e)}}/>
   <br />
   <Button variant="contained" onClick={handleSignUp}>Submit</Button>
   <h2>Login</h2>
   <input type="text" placeholder="Enter Email" name='email' value={user1.email} onChange={(e)=>{handleChange1(e)}}  />
   <br />
   <input type="password" placeholder="Password" name='password' value={user1.password} onChange={(e)=>{handleChange1(e)}} />
   <br />
   <Button variant="contained" onClick={handleLogin}>Submit</Button></> }
      
      </>
    )
    }