import { Route,Routes } from "react-router-dom"
import { Addflats } from "./Components/Addflats"
import { HomePage } from "./Components/HomePage"
import { LoginPage } from "./Components/Login"
export const AllRoutes=()=>{
return(
    <Routes>
        <Route path="/" element={<HomePage/>} ></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/addFlats" element={<Addflats/>}></Route>
    </Routes>
)
}