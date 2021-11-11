import React, {useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
export const Article = (props) => {
    const [article, setArticle] = useState('');
    const [source, setSource] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const { id } = useParams();
    const url = props.url;
    
    const getArticle = () => {
        axios.get(`http://${url}:8000/articles/${id}`)
            .then(res => {
                console.log(res.data);
                setArticle(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getSource = (id) => {
        axios.get(`http://${props.url}:8000/sources/${id}`)
            .then(res => {
                console.log(res.data);
                const source = res.data;
                setSource(source[0].name);
                setLoading2(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getArticle();
    }, [])

    if (isLoading == false) {
        getSource(article.source_id);
    }

    if (isLoading || isLoading2) {
        return (<>
        <h1></h1>
        </>);
    }


    return (
        <div class="w-75  mx-auto">
            <div class="d-flex justify-content-start mt-3">
                <Link to="/" class="btn btn-success">Back</Link>
                </div>
            <div class="w-75 mx-auto mt-3 mb-3 bg-white border rounded">
                <h1 class="bg-primary rounded text-white p-3">{article.title}</h1>
                <h2 class="ms-3 fs-3">By: {article.author_first_name + ' ' + article.author_last_name}</h2>
                <h4 class="ms-3 fs-3 justify-content-start fs-4">Source: {source}</h4>
                {(article.is_verified) ? <h3 class="badge bg-success rounded-pill ms-3 text-white fs-5">Verified</h3> : ''}
                {(article.is_opinion_piece) ? <h3 class="badge bg-danger rounded-pill ms-3 text-white fs-5">Opinion</h3> : ''}
                <p class="ms-3">{article.summary}</p>
                <p class="ms-3">Link to article: <a href={article.url} class="link-primary">{article.url}</a></p>
            </div>

        </div>
    );
}