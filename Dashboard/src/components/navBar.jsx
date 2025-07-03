import './navBar.css'
import { Link, useNavigate } from "react-router-dom";

function Nav() {

    const auth = localStorage.getItem("user");

    const navigate = useNavigate();

    function logout() { localStorage.clear(); navigate('/login') } // clears the local storage

    return (

        <div className="header">
                    

            {auth ? <ul className="List" >
                   <li>  
            <Link to = "./"><img src="https://img.freepik.com/premium-vector/shopping-logo-design-template_446318-130.jpg?w=1060" style={{height:"50px" , borderRadius:"20px"}}/></Link>
            </li>
                <li> <Link to='/'> Home </Link></li>
                <li> <Link to='./aboutUs'>AboutUs</Link></li>
                {/* <li>  <Link to='/update'> Update Product</Link> </li> */}
                <li>  <Link to='/addproduct'> AddProducts </Link> </li>
                <li>  <Link to='/prodlist'> Products </Link> </li>
                <li><Link to='/logout' onClick={logout}> LogOut</Link > </li>



            </ul>
                : <ul className="List" style={{textAlign:"right"}}>
                    <li>  
            <Link to = "./"><img src="https://img.freepik.com/premium-vector/shopping-logo-design-template_446318-130.jpg?w=1060" style={{height:"50px" , borderRadius:"20px" , alignItems:"left"}}/></Link>
            </li>
                    <li style={{color:'white'}}><Link to='./login'> Login</Link></li>
                    <li style={{color:'white'}}> <Link to='./signup' >SignUp</Link></li>
                </ul>
            }

        </div>
    )
}

export default Nav;