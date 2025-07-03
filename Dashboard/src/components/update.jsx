
import { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";

function Update() {

   
           
                const [name , setName] = useState("");
                const [price, setPrice] = useState("");
                const [company, setCompany] = useState("");
                const [err,setErr] = useState(false);
                const param = useParams();
                const navigate = useNavigate();

                    useEffect(()=>{
                         console.log(param);
                         getProductDetails(); // product ki details ayegi is funtion
                    },[])

                    const getProductDetails = async () => {
                       
                            let response = await fetch(`http://localhost:5000/product/${param.id}`);
                            let result = await response.json();
                           console.log(result);
                             
                            // enteries ko prefill karne k liye
                           setName(result.name)
                           setPrice(result.Price)
                           setCompany(result.company)
                          
                    };
                    
           
               const handleUpdate = async(e) =>        
               {
                e.preventDefault();
                    let result = await fetch(`http://localhost:5000/product/${param.id}`, 
                        {
                            method:"PUT",
                            body:JSON.stringify({name:name , Price:price , company:company}),
                            headers:{
                                "Content-Type":"application/json"
                            }
                        }

                    );

                    result = await result.json();
                    console.log(result);
                navigate("/prodlist");
               }
                   
           
               return (
                   <>
                         <h1 style={{textAlign:"center" , color:"black"}}> Update your product here </h1>
                       <form className="product" onSubmit={handleUpdate}>
           
           
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
                      
                       <button className="saveP" type = "submit">  Update product </button>
           
                       </form>
                      
           
                
        </>
    )
}

export default Update;