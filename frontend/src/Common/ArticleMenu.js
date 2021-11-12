import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
export const ArticleMenu = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const handleDelete = () => {
        axios.delete(`http://${props.url}:8000/articles/${props.article.id}`)
            .then(res => {
                console.log(res.data);
                {props.getArticles && props.getArticles()};
                navigate("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (<>
        {
            props.token &&
            <div class="dropdown float-end">
                <button class="btn btn-danger dropdown-toggle mt-3 me-2" type="button" href="#" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">Menu</button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li> <Link class="dropdown-item" to={`/article/${props.article.id}/edit`}>Edit</Link></li>
                    <li> <button class="dropdown-item" onClick={handleShow}>Delete</button></li>
                </ul>
            </div>
        }

        < Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Article</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal >
    </>)
}