import './navBar.css'
import { Link } from "react-router-dom";

function Nav() {

    return (

        <div className="header">

            <ul className="List">
                {/* <div className='logo'> <Link to="/"> <img src="" alt="" />Image here</Link></div> */}
                <li> <Link to='/'>Home </Link></li>
                <li> <Link to='./aboutUs'>AboutUs</Link></li>
                <li>  <Link to='/update'> Update Product</Link> </li>
                <li>  <Link to='/Logout'> LogOut</Link> </li>
                <li>  <Link to='/signUp'>SignUp</Link> </li>
                {/* <li>  <Link to='/profile'> <img src="" alt="profile section" /></Link> </li> */}
               

            </ul>

        </div>
    )
}

export default Nav;