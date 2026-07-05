import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();


    const [user,setUser] = useState({

        email:"",
        password:""

    });



    const handleChange = (e)=>{

        setUser({

            ...user,
            [e.target.name]:e.target.value

        });

    };



    const login = async()=>{


        try{


            const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/login`,
    user
);


            alert(response.data.message);


            // store user id

            localStorage.setItem(
                "user_id",
                response.data.user_id
            );


            navigate("/prediction");


        }


        catch(error){


            console.log(error);


            alert("Invalid Email or Password");


        }


    };



    return(

        <div>


            <h1>
                Login
            </h1>


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



            <button onClick={login}>

                Login

            </button>


        </div>

    )


}


export default Login;