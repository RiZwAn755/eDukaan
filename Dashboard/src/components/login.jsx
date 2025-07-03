import { useState } from "react";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";



function Login() {

    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const navigate = useNavigate();
    

    const call= async (e) => {

        e.preventDefault(); 
    
      console.log(Email , Password);

      let response = await fetch("http://localhost:5000/login", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  email: Email, password: Password })    
    });
    
    
  
    let result = await response.json();

    console.log("Login details:", result);

    if(result.token) // agar token (jo register krne pr  mila tha) sahi h , to login success hoga
    {
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.token)); // saving jwt token recieved
        navigate("/");
        alert("loggedIn successfully");
    }
    else{
        alert("enter the correct credentials");
    }
  

        
    };
    
    return (
        <>
            <h1 style={{ textAlign: "center" , color:"black" }}>User LogIn</h1>

            <div className="Reg">

                
                <form className="Rorm" onSubmit={call}> 

                    
                    <input className="inpt" type="email" placeholder="Email" value={Email} onChange={(e) => SetEmail(e.target.value)} />
              
                    <input className="inpt" type="password" placeholder="Enter a strong password" value={Password} onChange={(e) => SetPassword(e.target.value)} />
                    
                    <button className="save" type="submit"> Login User</button> 

                </form>
            </div>
        </>
    );
}

export default Login;