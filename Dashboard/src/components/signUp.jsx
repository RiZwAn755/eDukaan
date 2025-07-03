import { useState } from "react";
import "./signUp.css";
import {useNavigate} from "react-router-dom" ;


function SignUp() {
    const [Name, SetName] = useState("");
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const navigate = useNavigate();

    const collectData = async (e) => {
        e.preventDefault(); 
    
        console.log("collectData function called!"); 
        console.log("Name:", Name);
        console.log("Email:", Email);
        console.log("Password:", Password);
    
      
            let response = await fetch("http://localhost:5000/reg", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: Name, email: Email, password: Password })    
            });
            
            
          
            let result = await response.json();
            console.log("Data from server:", result);            

            localStorage.setItem("user", JSON.stringify(result.result)); 
            localStorage.setItem("token", JSON.stringify(result.token)); // saving jwt token recieved
            alert("signup successfull");
            navigate("/prodlist");
        
    };
    
    return (
        <>
            <h1 style={{ textAlign: "center" , color:'black' }}>New User Registration</h1>

            <div className="Reg">

                
                <form className="Rorm" onSubmit={collectData}> 

                    <input className="inpt" type="text" value={Name} onChange={(e) => SetName(e.target.value)} placeholder="Enter your full name here" />
                    <input className="inpt" type="email" placeholder="Email" value={Email} onChange={(e) => SetEmail(e.target.value)} />
                    <input className="inpt" type="email" placeholder="Re-enter Email" />
                    <input className="inpt" type="password" placeholder="Enter a strong password" value={Password} onChange={(e) => SetPassword(e.target.value)} />
                    
                    <button className="save" type="submit"> Create User</button> 

                </form>
            </div>
        </>
    );
}

export default SignUp;