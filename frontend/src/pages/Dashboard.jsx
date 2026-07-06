import {useEffect,useState} from "react";
import axios from "axios";


function Dashboard(){


const [history,setHistory]=useState([]);

const [user,setUser]=useState({});



useEffect(() => {

    const user_id = localStorage.getItem("user_id");

    axios.get(
        `${import.meta.env.VITE_API_URL}/history/${user_id}`
    )
    .then(response => {
        setHistory(response.data);
    });

    axios.get(
        `${import.meta.env.VITE_API_URL}/user/${user_id}`
    )
    .then(response => {
        setUser(response.data);
    });

}, []);

return(

<div className="container mt-5">



<h1 className="text-center">

Heart Disease Dashboard

</h1>




<div className="card p-4 mt-4">


<h3>

Welcome {user.name}

</h3>


<p>

Email: {user.email}

</p>



<h5>

Total Predictions:

{history.length}

</h5>



<h5>

Latest Result:

{

history.length>0

?

history[history.length-1].prediction

:

"No Prediction"

}


</h5>

</div>

</div>

)
}

export default Dashboard;