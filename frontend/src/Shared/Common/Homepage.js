import React from "react";
import { Card } from "./Card";
export const Homepage = (props) => {
    var articles = props.articles;
    console.log("test");
    console.log(articles);

    return (
        <>
            <div class="w-75 m-auto">
                <div class="d-flex justify-content-end mt-3"><button id="add" type="button" class="btn btn-success">Add</button></div>

                <br></br>
                <div class="d-flex justify-content-center flex-column">
                    {articles.map(article => {
                        return (
                            <div key={article.id}> <Card title={article.url} author={article.author_name} content={article.summary} /></div>
                        )
                    })}
                </div>
            </div>
        </>)
}
