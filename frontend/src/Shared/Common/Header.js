import React from "react";
import './Header.css';

export const Header = (props) => (
    <header>
        <img id="logo"></img>
        <div id="sign-in">
            <button id="sign-up" type="button">Sign Up</button>
            <button id="login" type="button">Log in</button>
        </div>
    </header>
) 