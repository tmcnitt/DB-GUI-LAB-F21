import React, {useState} from "react";
import {Card} from "./Card";
import {Header} from "./Header";
import "./Homepage.css";
import axios from "axios";
//import Card from "Card";

export const Homepage = (props) => {
    var [title, setTitle] = useState("");
    
    var getCards = () => {
        axios.get(`http://localhost:8000/articles`).then(
            res=> {
                //console.log(res.data);
                setTitle(res.data[0]);
            }
        )
    };

    getCards();
    return (
        <>
            <Header />
            <br></br>
            <div id="cardContainer">
            <Card title={title.author_name}/>
            </div>

        </>)
}
