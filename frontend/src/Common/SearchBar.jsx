import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ApiMain } from '../Common/ApiMain';

export const SearchBar = props => {
    const [title, setTitle] = useState("");
    const [authorLastName, setAuthorLastName] = useState("");
    const [tags, setTags] = useState([]);

    const api = new ApiMain();
    const allTags = [];

    useEffect(() => {
        api.getTags().then((res) => { allTags = res.data } )
    }, []);


    return <div class="w-75 mx-auto">
        <div class="mb-2 mt-5">
            <Form id="search-articles">
                <Row>
                    <Form.Group className="mb-2 ms-3 col-md-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" maxLength="255" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-3" controlId="authorLastName">
                        <Form.Label>Author Last Name</Form.Label>
                        <Form.Control type="text" maxLength="255" placeholder="Enter Last Name" value={authorLastName} onChange={(e) => setAuthorLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-3" controlId="authorLastName">
                        <Form.Label>Author Last Name</Form.Label>
                        <Form.Control type="text" maxLength="255" placeholder="Enter Last Name" value={authorLastName} onChange={(e) => setAuthorLastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="my_multiselect_field">
                        <Form.Label>My multiselect</Form.Label>
                        <Form.Control as="select" multiple value={tags} onChange={onSelectedOptionsChange}>
                            {allTags.map(tag => (
                                <option key={tag.tag} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Row>
            </Form>
        </div>
        <button class="btn btn-success" onClick={() => props.onSearch({ title, authorLastName })} form="search-form">Search</button>
    </div>

};