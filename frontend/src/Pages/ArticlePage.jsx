import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiMain } from '../Common';
import { ArticleMenu } from "../Common/ArticleMenu";
import { Comment } from "../Common/Comment";
import { Form, Row } from 'react-bootstrap';
export const ArticlePage = (props) => {
    const [article, setArticle] = useState('');
    const [source, setSource] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [validated, setValidated] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { id } = useParams();

    const api = new ApiMain();


    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        else {
            let newComment={
                comment: comment,
                article_id: id,
                user_id: props.userId};
            api.addComment(id, newComment).then(() => {
                setComment('');
                api.getComments(id).then(res => {
                    setComments(res.data);
                })
            }).catch(err => {
                console.log(err);
            });
            }
        }


    useEffect(() => {
        api.getArticle(id).then(res => {
            setArticle(res.data);
            setLoading(false);
        })
            .catch(err => {
                console.log(err);
            })

            api.getComments(id).then(res => {
                setComments(res.data);
            }).catch(err => {
                console.log(err);
            }
            )
    }, [])

    if (isLoading === false) {
        api.getSource(article.source_id).then(res => {
            const source = res.data;
            setSource(source[0].name);
            setLoading2(false);
        })
            .catch(err => {
                console.log(err);
            })
    }

    if (isLoading || isLoading2) {
        return (<>
            <h1></h1>
        </>);
    }


    return (
        <div class="mx-auto pb-4">
            <div class="w-75 mt-3 mx-auto">
                <Link to="/" class="btn btn-primary">Back</Link>
            </div>
            <div class="w-75 mx-auto mt-3 mb-3 bg-white rounded">
                <ArticleMenu article={article} token={props.token} username={props.username} userType={props.userType} />
                <h1 class="bg-primary rounded text-white p-3">{article.title}</h1>
                <h2 class="ms-3 fs-3">By: {article.author_first_name + ' ' + article.author_last_name}</h2>
                <h4 class="ms-3 fs-3 justify-content-start fs-4">Source: {source}</h4>
                {(article.is_verified) ? <h3 class="badge bg-success rounded-pill ms-3 text-white fs-5">Verified</h3> : ''}
                {(article.is_opinion_piece) ? <h3 class="badge bg-danger rounded-pill ms-3 text-white fs-5">Opinion</h3> : ''}
                <p class="ms-3">{article.summary}</p>
                <p class="ms-3">Link to article: <a href={article.url} class="link-primary">{article.url}</a></p>
            </div>
            {props.token && <div class="w-75 mx-auto mt-3 mb-3 bg-white rounded">
                <Form noValidate validated={validated} onSubmit={handleSubmit} id="commentForm">
                    <h3 class="bg-primary rounded text-white p-3">Add Comment</h3>
                    <Row className="px-3 col-md-9">
                        <Form.Group controlId="formComment">
                            <Form.Control as="textarea" rows="3" placeholder="Enter comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
                            <Form.Control.Feedback type="invalid">
                                Please enter a comment.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <button type="submit" form="commentForm" class="btn btn-success col-md-1 ms-3 mt-3 mb-3">Submit</button>
                </Form>
            </div> }
            

            <div class="w-75 mx-auto mt-3 mb-3 bg-white rounded">
                <h3 class="bg-primary rounded text-white p-3">Comments</h3>
                {comments.map(comment => {
                    return (
                        <Comment comment={comment} />
                    )
                })}
                <div class="pb-2"/>
                </div>
        </div>
    );
}