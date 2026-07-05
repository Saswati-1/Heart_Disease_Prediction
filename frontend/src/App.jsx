import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Prediction from "./pages/Prediction";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route path="/" element={<Register/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/prediction" element={<Prediction/>}/>

<Route path="/history" element={<History/>}/>

</Routes>

</BrowserRouter>

)

}


export default App;