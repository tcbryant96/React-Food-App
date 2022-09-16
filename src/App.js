import Home from "./components/Home";
import MyNavbar from "./components/MyNavbar";
import SignUp from "./components/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";
import Fridge from "./components/Fridge";
import Login from "./components/Login";
import MyRecipes from "./components/MyRecipes";
import { useState } from "react";
import FridgeRecipes from "./components/FridgeRecipes";

function App() {
  let navigate = useNavigate();
  let login = async () => {
    let token = localStorage.token;
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer "+token
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/", requestOptions)
      .then((response) => response.json())
      .then((user) => grabUsername(user))
      .then((username => localStorage.setItem('username', username)))
      .catch((error) => console.log("error", error));
    
  };

   let grabUsername = (user) => {
      return user.username
   }
  let logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "")
    navigate("/login");
  };

  return (
    <>
      <MyNavbar logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/fridge" element={<Fridge />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
      </Routes>
 
    </>
  );
}

export default App;
