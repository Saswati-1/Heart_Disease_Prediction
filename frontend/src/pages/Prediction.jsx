import {useState} from "react";
import axios from "axios";

function Prediction(){
const [data,setData]=useState({

age:"",
sex:"",
cp:"",
trestbps:"",
chol:"",
fbs:"",
restecg:"",
thalach:"",
exang:"",
oldpeak:"",
slope:"",
ca:"",
thal:""

});

const [result,setResult]=useState("");

const [loading,setLoading]=useState(false);

const handleChange=(e)=>{


setData({

...data,

[e.target.name]:e.target.value

});
}
const predict=async()=>{
const user_id = localStorage.getItem("user_id");
try{
setLoading(true);
const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/predict`,
    {
        ...data,
        user_id: user_id
    }
);

setResult(response.data.prediction);

}
catch(error){

console.log(error);

setResult("Prediction Failed");

}

finally{

setLoading(false);

}
}
return(

<div className="container mt-5">

<h1 className="text-center mb-4">

Heart Disease Prediction

</h1>

<div className="row">

<div className="col-md-4 mb-3">

<input

className="form-control"

name="age"

placeholder="Age"

onChange={handleChange}

/>

</div>

<div className="col-md-4 mb-3">

<select

className="form-control"

name="sex"

onChange={handleChange}

>

<option value="">

Select Gender

</option>


<option value="1">

Male

</option>


<option value="0">

Female

</option>


</select>


</div>


<div className="col-md-4 mb-3">


<select

className="form-control"

name="cp"

onChange={handleChange}

>

<option value="">

Chest Pain Type

</option>


<option value="0">

Typical Angina

</option>


<option value="1">

Atypical Angina

</option>


<option value="2">

Non Anginal Pain

</option>


<option value="3">

Asymptomatic

</option>


</select>


</div>

<div className="col-md-4 mb-3">


<input

className="form-control"

name="trestbps"

placeholder="Resting Blood Pressure"

onChange={handleChange}

/>


</div>

<div className="col-md-4 mb-3">


<input

className="form-control"

name="chol"

placeholder="Cholesterol"

onChange={handleChange}

/>

</div>

{/* Fasting Blood Sugar */}

<div className="col-md-4 mb-3">

<select

className="form-control"

name="fbs"

onChange={handleChange}

>

<option value="">
Fasting Blood Sugar
</option>

<option value="0">
Normal less than or equal to 120 mg/dl
</option>

<option value="1">
High greater than 120 mg/dl
</option>


</select>

</div>

{/* Rest ECG */}

<div className="col-md-4 mb-3">

<select

className="form-control"

name="restecg"

onChange={handleChange}

>


<option value="">
Resting ECG
</option>


<option value="0">
Normal
</option>


<option value="1">
ST-T Wave Abnormality
</option>


<option value="2">
Left Ventricular Hypertrophy
</option>


</select>


</div>

{/* Maximum Heart Rate */}

<div className="col-md-4 mb-3">


<input

className="form-control"

name="thalach"

placeholder="Maximum Heart Rate"

onChange={handleChange}

/>


</div>

{/* Exercise Angina */}

<div className="col-md-4 mb-3">


<select

className="form-control"

name="exang"

onChange={handleChange}

>


<option value="">

Exercise Induced Angina

</option>


<option value="0">

No

</option>


<option value="1">

Yes

</option>


</select>


</div>

{/* Oldpeak */}

<div className="col-md-4 mb-3">


<input

className="form-control"

name="oldpeak"

placeholder="ST Depression (Oldpeak)"

onChange={handleChange}

/>


</div>

{/* Slope */}

<div className="col-md-4 mb-3">


<select

className="form-control"

name="slope"

onChange={handleChange}

>


<option value="">

ST Segment Slope

</option>


<option value="0">

Upsloping

</option>


<option value="1">

Flat

</option>


<option value="2">

Downsloping

</option>


</select>


</div>

{/* CA */}

<div className="col-md-4 mb-3">


<select

className="form-control"

name="ca"

onChange={handleChange}

>


<option value="">

Major Vessels (CA)

</option>


<option value="0">
0 vessels
</option>


<option value="1">
1 vessel
</option>


<option value="2">
2 vessels
</option>


<option value="3">
3 vessels
</option>


</select>


</div>

{/* Thal */}

<div className="col-md-4 mb-3">


<select

className="form-control"

name="thal"

onChange={handleChange}

>


<option value="">

Thalassemia

</option>


<option value="0">

Normal

</option>


<option value="1">

Fixed Defect

</option>


<option value="2">

Reversible Defect

</option>
</select>
</div>
</div>

<div className="text-center mt-3">

<button
className="btn btn-primary"
onClick={predict}
>
{
loading ? "Checking..." : "Predict"
}
</button>
</div>
{
result &&
<div className="text-center mt-4">
<div
className={
result.includes("No")
?
"alert alert-success"
:
"alert alert-danger"
}
>
<h3>
{result}
</h3>
</div>
</div>
}
</div>
)
}
export default Prediction;