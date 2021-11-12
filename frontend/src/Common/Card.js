import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
import axios from "axios";
export const Card = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete = () => {
        axios.delete(`http://${props.url}:8000/articles/${props.article.id}`)
          .then(res => {
            console.log(res.data);
            props.getArticles();
          })
          .catch(err => {
            console.log(err);
          })
      }
        

    return (
        <>
            <div id="information-card" class="border rounded mb-3 bg-white">

                <div class="dropdown float-end">
                    <button class="btn btn-danger dropdown-toggle mt-3 me-2" type="button" href="#" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">Menu</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li> <a class="dropdown-item" href="#">Edit</a></li>
                        <li> <button class="dropdown-item" onClick={handleShow}>Delete</button></li>
                    </ul>
                </div>

                <h1 id="information-card-title" class="bg-primary rounded text-white p-3">{props.article.title}</h1>

                <p id="information-card-timestamp" class="me-3 float-end">{new Date(Date.parse(props.article.created_timestamp)).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: "CST" })}</p>
                <h2 id="information-card-author" class="ms-3 fs-3 justify-content-start">By: {props.article.author_first_name + ' ' + props.article.author_last_name}</h2>
                <h4 class="ms-3 fs-3 justify-content-start fs-4">Source: {props.source}</h4>
                {(props.article.is_verified) ? <h3 class="badge bg-success rounded-pill ms-3 text-white fs-5">Verified</h3> : ''}
                {(props.article.is_opinion_piece) ? <h3 class="badge bg-danger rounded-pill ms-3 text-white fs-5">Opinion</h3> : ''}
                <p id="information-card-content" class="ms-3">{props.article.summary}</p>

                <Modal show={show} onHide={handleClose}>
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
                </Modal>
            </div>
        </>)

};