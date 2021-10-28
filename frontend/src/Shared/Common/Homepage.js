import React from "react";
import { Card } from "./Card";
import "./Homepage.css";
//import Card from "Card";
export class Homepage extends React.Component {
    render() {
        return (<>
            <div id="topbar">
                <img src="https://via.placeholder.com/150"></img>
                <h1>Political Thingamajig</h1>
                <div class="clear"></div>
                <ul id="navbar">
                    <li><a href="login">Login</a></li>
                    <li><a href="home">Home</a></li>
                </ul>
                <button type="button">Add</button>
                
            </div>
            <Card/>
        </>)
    }
}