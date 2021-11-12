import React, { useEffect, useState, forceUpdate } from "react";
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
export const Header = (props) => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLogout = () => {
        console.log("logout");
        localStorage.removeItem('token');
        props.setToken(null);
        navigate('/');
    }

    useEffect(() => {
        console.log('in useeffect in header component');
        setIsLoggedIn(props.token);
    }, [props.token]);

    return (
        <header>
            <div class="bg-dark bg-gradient d-flex flex-row justify-content-end align-items-end w-75 pb-2 ps-2 pe-2 m-auto">
                <Link to="/" class="me-auto"><img id="logo" src="https://via.placeholder.com/150"></img></Link>
                <h1 class="me-auto text-white">Political Bias Tool</h1>
                {!isLoggedIn && <Link to="/signup" class="btn btn-primary mx-2">Sign Up</Link>}
                {!isLoggedIn && <Link to="/login" class="btn btn-primary ms-2">Log in</Link>}
                {isLoggedIn && <button type="button" id="logoutButton" onClick={onLogout} className="btn btn-primary ms-2" >Log Out</button>}
            </div>
        </header>
    )
}