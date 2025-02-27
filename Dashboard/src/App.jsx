
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/navBar"
import Aboutus from "./components/aboutUs";
import Footer from "./components/footer";
import SignUp from "./components/signUp"
import PrivateComp from "./components/privateComponent";
import Login from "./components/login";

function App() {
  return (

    <>

      <BrowserRouter>
        <Nav />

        <Routes>
           
           <Route element = {<PrivateComp/>}>

          <Route path="/" element={<h1>Home page</h1>}> </Route>
          <Route path="/aboutUs" element={<Aboutus />}> </Route>           
          <Route path="/logout" element={<h1> Logout page</h1>}> </Route>
          <Route path="/update" element={<h1> Update page</h1>}> </Route>
          
          </Route>  
          <Route path="/login" element={<Login/>}> </Route>
          <Route path="/signUp" element={<SignUp />}> </Route>
          
         


        </Routes>

      </BrowserRouter>
      
      <Footer />



    </>

  )
}

export default App;