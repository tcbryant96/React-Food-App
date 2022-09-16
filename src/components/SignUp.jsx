import React from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import image from "../Images/orange2.jpg"

export default function SignUp(props) {
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        console.log(password)
        if (password !== confirmPass) {
            // props.flashMessage("Your passwords do not match", "danger");
        } else {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password,
            });

            fetch("http://localhost:5000/api/user", {
                method: "POST",
                headers: myHeaders,
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        console.log("success")
                        props.flashMessage("Account created", "success");
                        navigate('/login')
                    }
                });
        }
    }

    return (
        <>
        <div  className="container-fluid">
        <div className='row d-flex justify-content-center' >
            <div className='col-6'>
            <Card className='border-success border-4 mt-5'>
            <h4 className="text-center underline">Create Your Account</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group p-4">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control border-success border-3"
                        placeholder="Enter Email"
                        name="email"
                        required
                    />
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
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control border-success border-3"
                        placeholder="Enter Password Again"
                        name="confirmPass"
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
            </div>
            </div>
            </div>
        </>
    )
}
