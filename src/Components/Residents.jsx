import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import axios from 'axios';
export const Residents=()=>{
    let [residents,setResidents]=useState([]);
    const id =useSelector((store)=>store.flat_id)
    console.log(id)
    let navigate=useNavigate();
    function handleHome(){
        navigate("/")
        }
        const getData=()=>{
            axios.get(`https://appartment-server.herokuapp.com/flats/residents/${id}`).then((res)=>{
                setResidents([...res.data.residents])
                console.log(res.data);
            })
       }
       useEffect(()=>{
      getData();
       },[])
    return(
      
        <><h1>Residents page</h1>
          <Button variant="contained" onClick={handleHome}>Home</Button>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            {/* <TableCell align="right">Edit</TableCell> */}
            <TableCell align="right">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {
               residents.map((item)=>{
                   return <TableRow key={item._id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="right">{item.name}</TableCell>
                      <TableCell align="right">{item.age}</TableCell>
                      <TableCell align="right">{item.gender}</TableCell>
                      
                     
                   </TableRow>
               })
           }
        </TableBody>
        </Table>
        </TableContainer>
        </>
    )
}