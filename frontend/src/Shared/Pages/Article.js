import React from 'react';
import { useLocation, Link } from 'react-router-dom';
export const Article = () => {
    const article = useLocation().state;
    return (
        <div class="w-75  mx-auto">
            <div class="d-flex justify-content-start mt-3">
                <Link to="/" class="btn btn-success">Back</Link>
                </div>
            <div class="w-75 mx-auto mt-5 mb-3 bg-white border rounded">
                <h1 class="bg-primary rounded text-white p-3">{article.title}</h1>
                <h2 class="ms-3 fs-3">By: {article.author_name}</h2>
                {(article.is_verified) ? <h3 class="badge bg-success rounded-pill ms-3 text-white fs-5">Verified</h3> : ''}
                {(article.is_opinion_piece) ? <h3 class="badge bg-danger rounded-pill ms-3 text-white fs-5">Opinion</h3> : ''}
                <p class="ms-3">{article.summary}</p>
            </div>

        </div>
    );
}