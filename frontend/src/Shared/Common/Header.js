import React from "react";
import './Header.css';

export const Header = (props) => (
    <header>

        <div id="sign-in" class="bg-light d-flex flex-row justify-content-end align-items-end w-75 m-auto">
            <img id="logo" class="me-auto" src="https://via.placeholder.com/150"></img>
            <h1 class="me-auto">Political Bias Tool</h1>
            <button id="sign-up" type="button" class="btn btn-primary mx-2">Sign Up</button>
            <button id="login" type="button" class="btn btn-primary mx-2">Log in</button>
        </div>
    </header>
)