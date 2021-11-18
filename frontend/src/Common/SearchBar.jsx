import React, { useEffect, useState } from 'react';
import { Article } from '../Common/Article';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ApiMain } from '../Common/ApiMain';

export const SearchBar = props => {
    const [title, setTitle] = useState("");
    const [authorLastName, setAuthorLastName] = useState("");
    const [tags, setTags] = useState("");

    return <Form onSubmit={() => props.onSearch({ title, authorLastName, tags })} id="search-articles">
        <Row>
            <Form.Group className="mb-2 ms-3 col-md-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" maxLength="255" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2 ms-3 col-md-3" controlId="authorLastName">
                <Form.Label>Author Last Name</Form.Label>
                <Form.Control type="text" maxLength="255" placeholder="Enter Last Name" value={authorLastName} onChange={(e) => setAuthorLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2 ms-3 col-md-3" controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Select
                    isMulti
                    name="colors"
                    options={"1", "2", "3"}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </Form.Group>
        </Row>

    </Form>
};