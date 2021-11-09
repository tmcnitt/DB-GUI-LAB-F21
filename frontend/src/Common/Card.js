import React from "react";
export const Card = (props) => (
    <div id="information-card" class="border rounded mx-auto bg-white">
        <h1 id="information-card-title" class="bg-primary rounded text-white p-3">{props.article.title}</h1>
        <p id="information-card-timestamp" class="me-3 float-end">{new Date(Date.parse(props.article.created_timestamp)-21600000).toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: "CST"})}</p>
        <h2 id="information-card-author" class="ms-3 fs-3 justify-content-start">By: {props.article.author_name}</h2>
        {(props.article.is_verified) ? <h3 class="badge bg-success rounded-pill ms-3 text-white fs-5">Verified</h3> : ''}
        {(props.article.is_opinion_piece) ? <h3 class="badge bg-danger rounded-pill ms-3 text-white fs-5">Opinion</h3> : ''}
        <p id="information-card-content" class="ms-3">{props.article.summary}</p>
    </div>
);