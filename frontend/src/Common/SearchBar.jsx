import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ApiMain } from '../Common/ApiMain';
import { SearchTags } from '../Pages';

export const SearchBar = props => {
    const [title, setTitle] = useState("");
    const [authorLastName, setAuthorLastName] = useState("");
    const [tags, setTags] = useState([]);
    const [buttonText, setButtonText] = useState("Tags");
    const api = new ApiMain();
    const allTags = [];

    let changeButtonText = () => {
        if(buttonText === "Tags") {
            setButtonText("Close Tags");
        }
        else {
            setButtonText("Tags");
        }
    }

    let changeTags = (checkedTags) => {
        setTags(checkedTags);
        console.log(tags);
    }

    if (buttonText === "Close Tags") {
        return <SearchTags currentTags={tags} setSearchTags={changeTags} changeButtonText={changeButtonText} />
      }

    return <div class="w-75 mx-auto">
        <Form id="search-articles">
            <Row>
                <Form.Group className="mb-2 col-md-4" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" maxLength="255" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2 col-md-4" controlId="authorLastName">
                    <Form.Label>Author Last Name</Form.Label>
                    <Form.Control type="text" maxLength="255" placeholder="Enter Last Name" value={authorLastName} onChange={(e) => setAuthorLastName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2 col-4" controlId="authorLastName">
                    <Form.Label>&nbsp;</Form.Label>
                        
                    <button type="button" class="btn btn-primary col-12" onClick={() => changeButtonText()}>{buttonText}</button>
                </Form.Group>
            </Row>
        </Form>
        <button class="btn btn-success col-12" onClick={() => props.onSearch({ title, authorLastName })} form="search-form">Search</button>
    </div>

};