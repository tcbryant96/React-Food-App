
import React from 'react'
import Card from 'react-bootstrap/Card'
import "../App.css"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';

export default function Login(props) {
    useEffect(()=>{
        console.log(localStorage)
    }, [localStorage.token])
  
    let navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault();
        let password = e.target.password.value;
        let username = e.target.username.value;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + btoa(`${username}:${password}`));
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "username": username,
          "password": password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        let response = await fetch("http://localhost:5000/api/token", requestOptions)
        if (response.ok){
          let data = await response.json()
          var token = data.token;
          localStorage.setItem("token", token)
          var myHeaders2 = new Headers();
          myHeaders2.append(
            "Authorization",
            "Bearer "+token
          );
            console.log("Bearer "+token)
          var requestOptions = {
            method: "GET",
            headers: myHeaders2,
            redirect: "follow",
          };
      
          let response2 = await fetch("http://localhost:5000/api/users/", requestOptions)
           let data2 = await response2.json()
           console.log(data2)
        props.setUser(data2)
        localStorage.setItem("username", data2.username)
            navigate('/')
        props.flashMessage(`welcome back ${data2.username}`, "success")}
        else{
            props.flashMessage("Username or Password Incorrect", "danger")
        }
            
    }
    return (
        <>
        <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
            <div className="container-fluid">
                <div className='row d-flex justify-content-center' >
                    <Col lg={5} md={6} sm={8} xs={10}>
                        <Card className='border-success border-3 mt-5'>
                            <h4 className="text-center underline">Login</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group p-4">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control border-success border-3"
                                        placeholder="Enter Username"
                                        name="username"
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control border-success border-3"
                                        placeholder="Enter Password"
                                        name="password"
                                        required
                                    />

                                    <input
                                        type="submit"
                                        className="btn btn-success w-100 mt-3"
                                        value="Login"
                                    />
                                </div>
                            </form>
                        </Card>
                    </Col>
                </div>
            </div>
            </ThemeProvider>
        </>
    )
}
