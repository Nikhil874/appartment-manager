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
export const HomePage=()=>{
    let [flatData,setFlatData]=useState([]);
    const _id =useSelector((store)=>store._id)
    // console.log(_id).
 const getData=()=>{
      axios.get(`http://localhost:3001/flats/${_id}`).then((res)=>{
          setFlatData([...res.data])
          console.log(res.data);
      })
 }
 useEffect(()=>{
getData();
 },[])

return(
    <><h2>Home Page</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Block</TableCell>
            <TableCell align="right">FlatNo.</TableCell>
            <TableCell align="right">Resident Type</TableCell>
            <TableCell align="right">No.of Residents</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {
               flatData.map((item)=>{
                   return <TableRow key={item._id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="right">{item.block}</TableCell>
                      <TableCell align="right">{item.flatNo}</TableCell>
                      <TableCell align="right">{item.residentType}</TableCell>
                      <TableCell align="right">{item.residents.length}</TableCell>
                      <TableCell align="right">Edit</TableCell>
                     
                      <TableCell align="right" >Delete </TableCell>
                   </TableRow>
               })
           }
        </TableBody>
        </Table>
        </TableContainer>
        </>
)
}