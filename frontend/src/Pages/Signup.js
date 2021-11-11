import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [user_type, setUserType] = useState("");

    const handleSubmit = (e) => {
       
    }

    return (
        <div class="w-75 mx-auto">
            <div class="border mb-2 mt-5">
                <h1 class="text-white bg-primary p-3 mb-0">Sign Up</h1>
                <Form id="signup-form" onSubmit={handleSubmit} className="bg-white py-2 mt-0">
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter a Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
            <button class="btn btn-success" type="submit" form="add-article-form">Submit</button>
        </div>
    );
}