import Home from "./components/Home";
import MyNavbar from "./components/MyNavbar";
import SignUp from "./components/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";
import Fridge from "./components/Fridge";
import Login from "./components/Login";
import MyRecipes from "./components/MyRecipes";
import { useState, useEffect } from "react";
import FridgeRecipes from "./components/FridgeRecipes";
import AlertMessage from "./components/AlertMessage";

function App() {
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);
  const [user, setUser] = useState(false)
  const [recipes, setRecipes] = useState([])

  useEffect(()=> {
       
  }, [user])
  let navigate = useNavigate();
  let login = () => {
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
      .then((data) => handleMessage(data))
      .then((user)=> localStorage.setItem("username", user.username))
      .catch((error) => console.log("error", error));
  };

  let handleMessage = (data) => {
    flashMessage(`Welcome back ${data.username}`, "success")
    return data
  }
  let logout = () => {
    localStorage.clear()
    setUser(false)
    navigate("/login");
  };
  const flashMessage = (message, category) => {
    setMessage(message);
    setCategory(category);
  };

  return (
    <>
      <MyNavbar logout={logout} user={user}/>
      {message ? (
        <AlertMessage
          message={message}
          category={category}
          flashMessage={flashMessage}
        />
      ) : null}
      <Routes>
        <Route path="/" element={<Home flashMessage={flashMessage} recipes={recipes} setRecipes={setRecipes}/>} />
        <Route path="/signup" element={<SignUp flashMessage={flashMessage}/>} />
        <Route path="/shopping-cart" element={<ShoppingCart flashMessage={flashMessage}/>} />
        <Route path="/fridge" element={<Fridge flashMessage={flashMessage} setRecipes={setRecipes}/>} />
        <Route path="/login" element={<Login login={login} flashMessage={flashMessage} setUser={setUser}/>} />
        <Route path="/myrecipes" element={<MyRecipes flashMessage={flashMessage}/>} />
      </Routes>
 
    </>
  );
}

export default App;
