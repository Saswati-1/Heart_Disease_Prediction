import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register(){

    const navigate = useNavigate();


    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });


    const handleChange = (e)=>{

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };


    const register = async()=>{

        try{

            const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/register`,
    user
);


            alert(response.data.message);


            navigate("/login");


        }
        catch(error){

    console.log(error);

    if(error.response){

        alert(error.response.data.message);

    }
    else{

        alert("Server not running");

    }

}

    };



    return(

        <div>

            <h1>
                Register
            </h1>


            <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            />

            <br/><br/>


            <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            />

            <br/><br/>


            <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            />

            <br/><br/>


            <button onClick={register}>
                Register
            </button>


        </div>

    )

}


export default Register;