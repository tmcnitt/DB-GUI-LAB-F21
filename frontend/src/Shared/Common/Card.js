import React from "react";
import './Card.css';

export const Card = (props) => (
    <div id="information-card">
        <h1 id="information-card-title">{props.title}</h1>
        <h2 id="information-card-author">{props.author}</h2>
        <p id="information-card-content">{props.content}</p>
    </div>
);