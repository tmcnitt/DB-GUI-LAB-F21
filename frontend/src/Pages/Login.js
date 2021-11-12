import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../Common/User';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        else {
            let newUser = new User(username, password);
            axios.post(`http://${props.url}:8000/login`, newUser).then(res => {
                props.setToken(res.data.data.jwt);
                localStorage.setItem('token', res.data.data.jwt);
                navigate("/");
                console.log(res.data.data)
                console.log('logged in');
            }).catch(err => {
                console.log(err)
                alert(err);
            });
        }
    }

    return (
        <div class="w-75 mx-auto">
            <div class="border mb-2 mt-5">
                <h1 class="text-white bg-primary p-3 mb-0">Login</h1>
                <Form noValidate validated={validated} id="login-form" onSubmit={handleSubmit} className="bg-white py-2 mt-0">
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a password.</Form.Control.Feedback>
                    </Form.Group>
                    <p class="ms-3">Need an account? <Link to="/Signup">Sign Up</Link></p>
                </Form>
                
            </div>
            <Link to="/" class="btn btn-danger me-3">Cancel</Link>
            <button class="btn btn-success" id="loginButton" type="submit" form="login-form">Submit</button>
            
        </div>
    );
}