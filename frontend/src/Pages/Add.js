import React, { useState } from 'react';
import { Article } from '../Common/Article';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Add = (props) => {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [is_opinion_piece, setOpinion] = useState(0);
    const [is_verified, setVerified] = useState(0);
    const [summary, setSummary] = useState("");
    const [author_name, setAuthor] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let newArticle = new Article(title, url, is_opinion_piece, is_verified, summary, author_name);
        axios.post(`http://${props.url}:8000/articles`, newArticle).then(res => {
            navigate("/");
        }).catch(err => { 
            console.log(err.data) 
            alert(err.data);
        });
    }

    return (
        <div class="w-75 mx-auto">
            <div class="border mb-2 mt-5">
                <h1 class="text-white bg-primary p-3 mb-0">Add Article</h1>
                <form id="add-article-form" class="bg-white pt-2 mt-0" onSubmit={handleSubmit}>
                    <label htmlFor="title" class="ms-3">Title:</label>
                    <input type="text" name="title" value={title} class="mb-3 ms-2" onChange={e => setTitle(e.target.value)} />
                    <br />
                    <label htmlFor="url" class="ms-3">URL:</label>
                    <input type="text" name="url" value={url} class="mb-3 ms-2" onChange={e => setUrl(e.target.value)} />
                    <br />
                    <label htmlFor="is_opinion_piece" class="ms-3">Opinion Piece:</label>
                    <input type="checkbox" name="is_opinion_piece" value={1} class="mb-3 ms-2" onChange={e => setOpinion(e.target.value)} />
                    <br />
                    <label htmlFor="is_verified" class="ms-3">Verified:</label>
                    <input type="checkbox" name="is_verified" value={1} class="mb-3 ms-2" onChange={e => setVerified(e.target.value)} />
                    <br />
                    <label htmlFor="summary" class="ms-3">Summary:</label>
                    <textarea name="summary" value={summary} class="mb-3 ms-2" rows="5" onChange={e => setSummary(e.target.value)} />
                    <br />
                    <label htmlFor="author_name" class="ms-3">Author:</label>
                    <input type="text" name="author_name" value={author_name} class="mb-3 ms-2" onChange={e => setAuthor(e.target.value)} />
                </form>
            </div>

            <Link to="/" class="btn btn-danger me-3">Cancel</Link>

            <button class="btn btn-success" type="submit" form="add-article-form" value="Submit">Submit</button>

        </div>
    );
}