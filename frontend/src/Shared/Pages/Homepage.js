import React from "react";
import { Link } from 'react-router-dom';
import { Card } from "../Common/Card";
export const Homepage = (props) => {
    var articles = props.articles;
    console.log("test");
    console.log(articles);
    return (
        <>
            <div class="w-75 m-auto">
                <div class="d-flex justify-content-end mt-3">
                <Link to="/add" class="btn btn-success">Add</Link>
                </div>
                <br></br>
                <div class="d-flex justify-content-center flex-column">
                    {articles.map(article => {
                        return (
                            <Link key={article.id} class="text-decoration-none text-reset" to={`/article`} state={article}> <Card title={article.title} author={article.author_name} content={article.summary} /></Link>
                        )
                    })}
                </div>
            </div>
        </>)
}
