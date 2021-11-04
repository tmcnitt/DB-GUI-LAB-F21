import React from 'react';
import {useLocation} from 'react-router-dom';
export const Article = () => {
    const article = useLocation().state;
    return (
        <div class="border mt-5 mb-3 w-75 rounded mx-auto">
            <h1 class="bg-primary rounded text-white p-3">{article.title}</h1>
            <h2 class="ms-2 fs-3">By: {article.author_name}</h2>
            {(article.is_verified) ? <h3>Verified</h3> : ''}
            {(article.is_opinion_piece) ? <h3 class="ms-3 text-success">Opinion</h3> : ''}
            <p class="ms-2">{article.summary}</p>
        </div>
    );
}