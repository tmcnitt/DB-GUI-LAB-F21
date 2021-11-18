import React from "react";
import { Link } from 'react-router-dom';
import { ArticleMenu } from "./ArticleMenu";
export const Card = (props) => {

    return (
        <>
            <div id="information-card" class=" rounded mb-3 w-75 mx-auto bg-white">
                <ArticleMenu article={props.article} url={props.url} token={props.token} username={props.username} userType={props.userType} />
                <Link class="text-decoration-none text-reset" to={`/article/${props.article.id}`}>
                    <h1 id="information-card-title" class="bg-primary rounded text-white p-3">{props.article.title}</h1>
                    <p id="information-card-timestamp" class="me-3 float-end">{new Date(Date.parse(props.article.created_timestamp)).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: "CST" })}</p>
                    <h2 id="information-card-author" class="ms-3 fs-3 justify-content-start">By: {props.article.author_first_name + ' ' + props.article.author_last_name}</h2>
                    <h4 class="ms-3 fs-3 justify-content-start fs-4">Source: {props.source}</h4>
                    {(props.article.is_verified) ? <h3 class="badge bg-success rounded-pill ms-3 text-white fs-5">Verified</h3> : ''}
                    {(props.article.is_opinion_piece) ? <h3 class="badge bg-danger rounded-pill ms-3 text-white fs-5">Opinion</h3> : ''}
                    {(props.article.tags.map((tag) => {
                        return (
                            <h4 key={tag.id} class="badge bg-primary rounded-pill ms-3 text-white fs-5">{tag.content}</h4>
                        )
                    }))}
                    <p id="information-card-content" class="ms-3">{props.article.summary}</p>
                </Link>


            </div>
        </>)

};