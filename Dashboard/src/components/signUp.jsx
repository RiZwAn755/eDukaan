import { useState } from "react";
import "./signUp.css";

function SignUp() {
    const [Name, SetName] = useState("");
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");

    const collectData = async (e) => {
        e.preventDefault(); // ✅ Prevent page refresh

        console.log("collectData function called!"); // Debugging

        if (!Name || !Email || !Password) {
            alert("All fields are required!");
            return;
        }

        let result = await fetch("http://localhost:5000/reg", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Name, Email, Password }) // ✅ Corrected JSON format
        });

        result = await result.json();
        console.log("Data from frontend:", result);
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>New User Registration</h1>

            <div className="Reg">
                {/* ✅ Ensure onSubmit is correctly attached */}
                <form className="form" onSubmit={collectData}>  
                    <label htmlFor="Name">Full Name</label>
                    <input className="inpt" type="text" value={Name} onChange={(e) => SetName(e.target.value)} placeholder="Enter your full name here" />

                    <label htmlFor="Email"> Email </label>
                    <input className="inpt" type="email" placeholder="Email" value={Email} onChange={(e) => SetEmail(e.target.value)} />

                    <label htmlFor="confirm"> Confirm Email</label>
                    <input className="inpt" type="email" placeholder="Re-enter Email" />

                    <label htmlFor="Password"> Password</label>
                    <input className="inpt" type="password" placeholder="Enter a strong password" value={Password} onChange={(e) => SetPassword(e.target.value)} />

                    {/* ✅ Ensure button type is "submit" */}
                    <button className="save" type="submit"> Create User</button> 
                </form>
            </div>
        </>
    );
}

export default SignUp;
