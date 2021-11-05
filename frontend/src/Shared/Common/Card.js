import React from "react";
export const Card = (props) => (
    <div id="information-card" class="border rounded mx-auto bg-white">
        <h1 id="information-card-title" class="bg-primary rounded text-white p-3">{props.title}</h1>
        <h2 id="information-card-author" class="ms-2 fs-3">{props.author}</h2>
        <p id="information-card-content" class="ms-2">{props.content}</p>
    </div>
);