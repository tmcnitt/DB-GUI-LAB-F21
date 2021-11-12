import React, { useState } from 'react';
import { Source } from '../Common/Source';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export const AddSource = (props) => {
    const [name, setName] = useState("");
    const [base_url, setBaseUrl] = useState("");
    const [owner_name, setOwnerName] = useState("");
    const [bias, setBias] = useState("");

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        else {
            let newSource = new Source(name, base_url, owner_name, bias);
            axios.post(`http://${props.url}:8000/sources`, newSource).then(res => {
                navigate('/');
            }).catch(err => {
                console.log(err.data);
                alert(err.data);
            });
        }

    }


    if (!props.token) {
        return (
            <div class="w-75 mx-auto">
                <div class="border mb-2 mt-5">
                    <h1 class="text-white bg-primary p-3 mb-0">You must be logged in to add a source</h1>
                </div>
            </div>
        )
    }

    return (
        <div class="w-75 mx-auto">
            <div class="border mb-2 mt-5">
                <h1 class="text-white bg-primary p-3 mb-0">Add Source</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit} id="add-source-form" className="bg-white py-2 mt-0">
                    <Row>
                        <Form.Group className="mb-2 ms-3 col-md-4" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter a name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2 ms-3 col-md-4" controlId="base_url">
                            <Form.Label>Base URL</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter Base URL" value={base_url} onChange={(e) => setBaseUrl(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter a base URL.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-2 ms-3 col-md-4" controlId="owner_name">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter Owner Name" value={owner_name} onChange={(e) => setOwnerName(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter an owner name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2 ms-3 col-md-4" controlId="bias">
                            <Form.Label>Bias</Form.Label>
                            <Form.Control type="text" maxLength="255" placeholder="Enter Bias" value={bias} onChange={(e) => setBias(e.target.value)} required />
                            <Form.Control.Feedback type="invalid"> Please enter a bias.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </div>

            <Link to="/" class="btn btn-danger me-3">Cancel</Link>

            <button class="btn btn-success" type="submit" form="add-source-form">Submit</button>

        </div>
    );
}