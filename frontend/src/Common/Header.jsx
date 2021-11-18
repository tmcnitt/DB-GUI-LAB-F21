import React, { useEffect, useState } from "react";
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
        window.location.reload();
    }

    useEffect(() => {
        setIsLoggedIn(props.token);
    }, [props.token]);

    return (
        <header>
            <div class="bg-dark d-flex flex-row justify-content-end align-items-end pb-2 ps-4 pe-2 m-auto">
                <Link to="/" class="me-auto"><img id="logo" src="https://nc.myusernamesthis.net/apps/files_sharing/publicpreview/88TM4cbGbfbRCMD?x=1848&y=630&a=true&file=logo-1.png"></img></Link>
                <h1 class="me-auto text-white">Political Bias Tool</h1>
                {!isLoggedIn && <Link to="/signup" class="btn btn-primary mx-2">Sign Up</Link>}
                {!isLoggedIn && <Link to="/login" class="btn btn-primary ms-2">Log in</Link>}
                {isLoggedIn && <button type="button" id="logoutButton" onClick={onLogout} className="btn btn-primary ms-2" >Log Out</button>}
            </div>
        </header>
    )
}