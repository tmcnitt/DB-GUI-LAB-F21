import React from "react";
import "./Homepage.css";
//import Card from "Card";
export class Homepage extends React.Component {
    render() {
        return (<>
            <div id="topbar">
                <img src="https://via.placeholder.com/150"></img>
                <h1>Political Thingamajig</h1>
                <ul id="navbar">
                    <li><a href="home">Home</a></li>
                    <li><a href="login">Login</a></li>
                </ul>
                <button type="button">Add</button>
            </div>
            
        </>)
    }
}