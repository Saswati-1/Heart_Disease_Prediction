import {useEffect,useState} from "react";
import axios from "axios";


function History(){


const [history,setHistory]=useState([]);



useEffect(()=>{


const user_id = localStorage.getItem("user_id");


axios.get(
    `${import.meta.env.VITE_API_URL}/history/${user_id}`
)

.then(response=>{

setHistory(response.data);

})

.catch(error=>{

console.log(error);

});


},[]);



return(

<div>


<h1>
Prediction History
</h1>


<table border="1">


<thead>

<tr>

<th>Age</th>
<th>Sex</th>
<th>CP</th>
<th>Chol</th>
<th>Prediction</th>
<th>Date</th>

</tr>

</thead>



<tbody>


{

history.map((item,index)=>(


<tr key={index}>


<td>{item.age}</td>

<td>{item.sex}</td>

<td>{item.cp}</td>

<td>{item.chol}</td>

<td>{item.prediction}</td>

<td>{item.created_at}</td>


</tr>


))


}



</tbody>


</table>


</div>

)


}


export default History;