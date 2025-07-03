import { useState } from "react";
import './addproducts.css'


function Addproduct(){


     const [name , setName] = useState("");
     const [price, setPrice] = useState("");
     const [company, setCompany] = useState("");
     const [err,setErr] = useState(false);
     

    const handleSubmit = async(e) =>        
    {
        e.preventDefault();

         console.log(name  , price , company );
            
         if(!name || !price || !company)
         {
            setErr(true);
            return false;
         }
         // local storage me jo user (loggedin user) h usi ka userid dalenge (kisne add kiya h)
         const UserId = JSON.parse(localStorage.getItem('user'));
         console.log(UserId._id);

         let prod = await fetch("http://localhost:5000/add-product" , {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({  name: name, Price:price , company:company , userid:UserId}) 
         });

          prod = await prod.json();

          if(prod)
          {
            alert("product listed successfully");
          }
          
          

    }
        

    return (
        <>
              <h1 style={{textAlign:"center" , color:"black"}}> List your product here </h1>
            <form className="product" onSubmit={handleSubmit}>


            <input  value = {name} className = "pd" type="text" placeholder="enter the product name" onChange={(e) =>{
                setName(e.target.value);
            }}/>
            {err && !name && <span className="ERR">*enter valid field</span>}
            <input value = {price}  className = "pd" type="text" placeholder="enter the product Price" onChange={(e) =>{
                setPrice(e.target.value);
            }} />
             {err && !price && <span className="ERR">*enter valid field</span>}
            <input value = {company}  className = "pd" type="text" placeholder="enter the company name" onChange={(e) =>{
                setCompany(e.target.value);
            }}/>
             {err && !company && <span className="ERR">*enter valid field</span>}
           
            <button className="saveP" type = "submit"> List the product </button>

            </form>
           

        </>
    )
}

export default Addproduct;