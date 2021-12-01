import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ApiMain } from ".";
import { Tag } from "./Tag";
export const SearchTags = (props) => {
    const [tags, setTags] = useState([]);
    const [checkedTags, setCheckedTags] = useState([]);
    const [validated, setValidated] = useState(false);

    const api = new ApiMain();

    const handleSubmit = (e) => {
        props.setSearchTags(checkedTags);
        props.changeButtonText();
    };

    useEffect(() => {
        setCheckedTags(props.currentTags);
        api.getTags().then(res => setTags(res.data));
    }, []);

    return (<div className="w-75 mx-auto pb-3">
        <div className="border rounded my-3 bg-white">
            <h1 className="bg-primary rounded text-white p-3">Search Article Tags</h1>
            <Form onSubmit={handleSubmit} className="pb-3 ms-2" id="search-tag-form">
                {tags.map((tag) => {
                    return (
                        <Form.Check key={tag.id} label={tag.content} type="checkbox" name="tag" id={tag.id} defaultChecked={checkedTags.includes(tag.id)}
                            onChange={(e) => {
                                let tagId = { tag_id: tag.id };
                                if (e.target.checked) {
                                    let selectedTags = checkedTags;
                                    selectedTags.push(tag.id);
                                    setCheckedTags(selectedTags);

                                } else {
                                    let selectedTags = checkedTags;
                                    let index = selectedTags.indexOf(tag.id);
                                    console.log(index);
                                    selectedTags.splice(index, 1);
                                    console.log(selectedTags);
                                    setCheckedTags(selectedTags);
                                }
                            }}/>
                    );
                })}

            </Form>
        </div>

        <button class="btn btn-success" onClick={() => handleSubmit()} form="search-form">Done</button>
    </div>
    )
}