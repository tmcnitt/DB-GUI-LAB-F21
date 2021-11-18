import React, { useState } from 'react';
import { User } from '../Common/User';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { ApiMain } from '../Common';

export const Signup = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user_type, setUserType] = useState("");

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const api = new ApiMain();

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        else {

            let newUser = new User(username, password);
            newUser["user_type"] = user_type;
            api.signup(newUser).then(res => {
                props.setToken(res.data.data.jwt);
                localStorage.setItem("token", res.data.data.jwt);
                navigate("/");
                console.log(res.data.data.jwt);
            }).catch(err => {
                console.log(err.data.data)
                alert(err.data.data);
            });
        }
    }

    if (props.token) {
        return (
            <div class="w-75 mx-auto">
                <div class="border mb-2 mt-5">
                    <h1 class="text-white bg-primary p-3 mb-0">You are already logged in</h1>
                    {navigate('/')}
                </div>
            </div>
        )
    }

    return (
        <div class="w-75 mx-auto">
            <div class="mb-2 mt-5">
                <h1 class="text-white bg-primary p-3 mb-0 rounded">Sign Up</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit} id="signup-form"  className="bg-white py-2 mt-0">
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter a Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a password.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="user_type">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => setUserType(e.target.value)} required>
                            <option></option>
                            <option value="curator">Curator</option>
                            <option value="reader">Reader</option>
                        </Form.Select>                
                    </Form.Group>
                </Form>
            </div>
            <Link to="/" class="btn btn-danger me-3">Cancel</Link>
            <button class="btn btn-success" id="signupButton" type="submit" form="signup-form">Submit</button>
        </div>
    );
}