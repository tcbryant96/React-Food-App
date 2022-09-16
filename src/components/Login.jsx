
import React from 'react'
import Card from 'react-bootstrap/Card'
import "../App.css"
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    let navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault();
        let password = e.target.password.value;
        let username = e.target.username.value;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTph");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        let response = await fetch("http://localhost:5000/api/token", requestOptions)
        let data = await response.json()
        localStorage.setItem('token', data.token)
        if (localStorage.token){
            props.login()
            navigate('/')
            

        }    
    }
    return (
        <>
            <div className="container-fluid">
                <div className='row d-flex justify-content-center' >
                    <div className='col-6'>
                        <Card className='border-success border-4 mt-5'>
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
                    </div>
                </div>
            </div>
        </>
    )
}
