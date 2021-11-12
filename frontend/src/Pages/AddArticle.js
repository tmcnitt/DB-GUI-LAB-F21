import React, { useEffect, useState } from 'react';
import { Article } from '../Common/Article';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
export const AddArticle = (props) => {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [is_opinion_piece, setOpinion] = useState(0);
    const [is_verified, setVerified] = useState(0);
    const [summary, setSummary] = useState("");
    const [author_first_name, setAuthorFirstName] = useState("");
    const [author_last_name, setAuthorLastName] = useState("");
    const [source_id, setSourceId] = useState("");

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [sources, setSources] = useState([]);

    const getSources = () => {
        axios.get(`http://${props.url}:8000/sources`)
            .then(res => {
                console.log(res.data);
                const sources = res.data;
                setSources(sources);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        else {

            let newArticle = new Article(title, url, is_opinion_piece, is_verified, summary, author_first_name, author_last_name, source_id);
            axios.post(`http://${props.url}:8000/articles`, newArticle).then(res => {
                navigate("/");
            }).catch(err => {
                console.log(err.data)
                alert(err.data);
            });
        }

    }

    useEffect(() => {
        getSources();
    }, []);

    if (!props.token) {
        return (
            <div class="w-75 mx-auto">
                <div class="border mb-2 mt-5">
                    <h1 class="text-white bg-primary p-3 mb-0">You must be logged in to add an article</h1>
                </div>
            </div>
        )
    }

    return (
        <div class="w-75 mx-auto">
            <div class="border mb-2 mt-5">
                <h1 class="text-white bg-primary p-3 mb-0">Add Article</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit} id="add-article-form" className="bg-white py-2 mt-0">
                    <Row>
                        <Form.Group className="mb-2 ms-3 col-md-6" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter a title.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2 col-md-4" controlId="source_id">
                            <Form.Label>Source</Form.Label>
                            <Form.Control as="select" value={source_id} onChange={(e) => setSourceId(e.target.value)} required>
                                <option value="">Select a source</option>
                                {sources.map(source => {
                                    return (
                                        <option value={source.id}>{source.name}</option>
                                    )
                                })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid"> Please select a source.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-2 ms-3 col-md-3" controlId="author_first_name">
                            <Form.Label>Author First Name</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter Author" value={author_first_name} onChange={(e) => setAuthorFirstName(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter author's first name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2 col-md-3" controlId="author_last_name">
                            <Form.Label>Author Last Name</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter Author" value={author_last_name} onChange={(e) => setAuthorLastName(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter author's last name.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-2 ms-3 col-md-4" controlId="url">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter a URL.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-3 mb-2 col-md-1" controlId="is_opinion_piece">
                            <Form.Label> </Form.Label>
                            <Form.Check type="checkbox" label="Opinion" checked={is_opinion_piece} onChange={(e) => setOpinion(e.target.checked)} />
                        </Form.Group>
                        <Form.Group className="mt-3 mb-2 col-md-1" controlId="is_verified">
                            <Form.Label></Form.Label>
                            <Form.Check type="checkbox" label="Verified" checked={is_verified} onChange={(e) => setVerified(e.target.checked)} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-2 ms-3 col-md-10" controlId="summary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control as="textarea" maxLength="255" rows="3" placeholder="Enter Summary" value={summary} onChange={(e) => setSummary(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter a summary.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </div>

            <Link to="/" class="btn btn-danger me-3">Cancel</Link>

            <button class="btn btn-success" type="submit" form="add-article-form">Submit</button>

        </div>
    );
}