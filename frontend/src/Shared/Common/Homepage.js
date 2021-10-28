import React from "react";
import { Card } from "./Card";
import { Header } from "./Header";
import "./Homepage.css";
export const Homepage = (props) => {
    var articles = props.articles;
    console.log("test");
    console.log(articles);

    return (
        <>
            <Header />
            <button id="add" type="button">Add</button>
            <br></br>
            <div id="cardContainer">
                {articles.map(article => {
                    return (
                        <div key={article.id}> <Card title={article.url} author={article.author_name} content={article.summary}/></div>
                    )
                })}
            </div>
        </>)
}
