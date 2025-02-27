// ye ek tarah se wrapper ka kam karega jo isme rhenge wo user login k bad hi dikhenge


import React from "react";

import { Navigate , Outlet } from "react-router-dom";

const PrivateComp = ()=>{
    
    const auth = localStorage.getItem("user");
     // agar user present h loalstorage me (i.e signedin)hai to baki page dikhenge nhi to signup page pr navigate ho jayenge
     
    return auth? <Outlet/> : <Navigate to = "/signUp"> </Navigate>
}

export default PrivateComp;