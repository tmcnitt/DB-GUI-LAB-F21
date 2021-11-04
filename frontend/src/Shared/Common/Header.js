import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
export const Header = (props) => (
    <header>

        <div id="sign-in" class="bg-light d-flex flex-row justify-content-end align-items-end w-75 m-auto">
            <Link to="/" class="me-auto"><img id="logo" src="https://via.placeholder.com/150"></img></Link>
            <h1 class="me-auto">Political Bias Tool</h1>
            <Link to="/signup" class="btn btn-primary mx-2">Sign Up</Link>
            <Link to="/login" class="btn btn-primary mx-2">Log in</Link>
        </div>
    </header>
)