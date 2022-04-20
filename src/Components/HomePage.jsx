import { useSelector } from "react-redux"
import { store } from "../Redux/store"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getFlat } from "../loginDetails/action";
import Stack from '@mui/material/Stack';
import { toggleLoading } from "../loginDetails/action";
import CircularProgress from '@mui/material/CircularProgress';
export const HomePage=()=>{
    let [pages,setpages]=useState(0);
    
    let [flatData,setFlatData]=useState([]);
    const _id =useSelector((store)=>store._id)
    // console.log(_id).
 const  getData=async()=>{
    dispatch(toggleLoading(true))
     await axios.get(`https://appartment-server.herokuapp.com/flats/${_id}?page=${page}`).then((res)=>{
        dispatch(toggleLoading(false))
          setFlatData([...res.data.flats])
          console.log(res.data);
       
         setpages(res.data.pages)
      }).catch((err)=>{
        dispatch(toggleLoading(false))   
      })
 }
 useEffect(()=>{
    if(_id){

        getData();
    } 
 },[])
 let navigate=useNavigate();
function handlenaviagte(){
navigate("/addFlats")
}
function handleLogining(){
    navigate("/login")
    }
    let dispatch=useDispatch();
    function handleDetails(id){
        dispatch(getFlat(id))
        navigate("/residents")
    }
    
  
    
        function handleFlatNo(value){
            if(value==1){
                flatData.sort(function(a,b) {return a.flatNo-b.flatNo})
            }else{
              flatData.sort(function(a,b) {return b.flatNo-a.flatNo})
            }
            setFlatData([...flatData])
          
        }
    let [type,setType]=useState(true)
    function handleType(){
        let value=type?"owner":"tenant"
        setType(type?false:true);
    }
    let [block,setBlock]=useState("");
    let [tenant,setTenant]=useState({type:""});
    let [owner,setOwner]=useState({type:""});
    function handleTenant(){
        setOwner({...owner,type:""});
        setTenant({...tenant,type:"tenant"})
    }
    function handleOwner(){
        setTenant({...tenant,type:""});
        setOwner({...owner,type:"owner"})
        console.log(owner);
    }
    let loading =useSelector((store)=>store.loading);
    let [page,setPage]=useState(1);
    console.log("page",page);
    function handlepage(value){
        if(page+value<=1&&page+value>pages){
            return;
        }else{
            setPage(page+value);
            getData();
        }
    }
return(
    <>
    {loading?<CircularProgress color="secondary"/>:
    <>
    <h2>Home Page</h2>
   
    {_id?  <Button variant="contained" onClick={handlenaviagte}>Add Flat</Button>:<Button variant="contained" onClick={handleLogining}>Login/SignUp</Button>}
   <br />
   {" "}
   <input type="text" placeholder="Search Block" onChange={(e)=>{setBlock(e.target.value)}} style={{"margin-left":"-80%"}} />
   <Stack spacing={2} direction="row">
       <h3>Filter By:</h3>     
      <Button variant="text" onClick={handleTenant} >Tenant</Button>
      <Button variant="text" onClick={handleOwner} >Owner</Button>
      <Button variant="text" onClick={()=>{handleFlatNo(1)}}>Flat No asc</Button>
      <Button variant="text" onClick={()=>{handleFlatNo(-1)}}>Flat No desc</Button>
    </Stack>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Block</TableCell>
            <TableCell align="right">FlatNo.</TableCell>
            <TableCell align="right">Resident Type</TableCell>
            <TableCell align="right">No.of Residents</TableCell>
            {/* <TableCell align="right">Edit</TableCell> */}
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {
               flatData.filter((e)=>{
                   if(block==""){
                       return true;
                   }else{
                       if(e.block==block){
                           return true;
                       }
                   }
               }).filter((e)=>{
                   if(tenant.type==""&&owner.type==""){
                       return true;
                   }else if(owner.type==""&&e.residentType==tenant.type){
                       return true;
                   }else{
                       if(e.residentType==owner.type){
                           return true
                       }
                   }
               }).map((item)=>{
                   return <TableRow key={item._id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="right">{item.block}</TableCell>
                      <TableCell align="right">{item.flatNo}</TableCell>
                      <TableCell align="right">{item.residentType}</TableCell>
                      <TableCell align="right">{item.residents.length}</TableCell>
                      {/* <TableCell align="right">Edit</TableCell> */}
                     
                      <TableCell align="right" onClick={()=>{handleDetails(item._id)}} >Details</TableCell>
                   </TableRow>
               })
           }
        </TableBody>
        </Table>
        </TableContainer>
        {pages>0?<h2>No of Pages:{pages}</h2>:""}
        {page>1? <Button variant="contained" onClick={()=>handlepage(-1)} >Prev</Button>:""}
       
        {" "}
        {page<pages? <Button variant="contained" onClick={()=>handlepage(1)} >Next</Button>:""}
        </>}
        </>
)
}