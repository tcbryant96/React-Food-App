import React from 'react'
import Card from 'react-bootstrap/Card'
import "../App.css"
import image from "../Images/orange2.jpg"
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function SignUp(props) {
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        let username = e.target.username.value
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        let email = e.target.email.value
        console.log(username,email,password)
        console.log(password)
        if (password !== confirmPass) {
            props.flashMessage("Your passwords do not match", "danger");
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            
            fetch("http://localhost:5000/api/user", requestOptions)
                .then(response => response.json())
                .then(result => props.flashMessage(`Account for ${result.username} has been created`, "primary"))
                .catch(error => console.log('error', error));
                navigate('/login')
                
        }
    }


    return (
        <>
        <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
            <div className="container-fluid">
                <Row className='row d-flex justify-content-center' >
                    <Col lg={5} sm={8} md={6}>
                        <Card className='border-success border-3 mt-5'>
                            <h4 className="text-center underline">Create Your Account</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group p-4">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control border-success border-3"
                                        placeholder="Enter Email"
                                        id="email"
                                        required
                                    />
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control border-success border-3"
                                        placeholder="Enter Username"
                                        id="username"
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control border-success border-3"
                                        placeholder="Enter Password"
                                        id="password"
                                        required
                                    />
                                    <label htmlFor="confirmPass">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control border-success border-3"
                                        placeholder="Enter Password"
                                        id="confirmPass"
                                        required
                                    />

                                    <input
                                        type="submit"
                                        className="btn btn-success w-100 mt-3"
                                        value="Sign Up"
                                    />
                                </div>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </div>
            </ThemeProvider>
        </>
    )
}
