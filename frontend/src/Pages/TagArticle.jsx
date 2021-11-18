import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ApiMain } from "../Common";
import { Tag } from "../Common/Tag";
export const TagArticle = (props) => {
    const { id } = useParams();
    const [tags, setTags] = useState([]);
    const [checkedTags, setCheckedTags] = useState([]);
    const [validated, setValidated] = useState(false);
    const [validatedAddTag, setValidatedAddTag] = useState(false);
    const [tagName, setTagName] = useState("");
    const api = new ApiMain();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        else {
            api.addTagToArticle(id, checkedTags).then(() => {
                navigate("/");
            }
            );
        }
    };

    const handleAddTag = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidatedAddTag(true);
        }
        else {
            let newTag = new Tag(tagName);
            api.addTag(newTag).then(() => {
                api.getTags().then(tags => {
                    setTags(tags.data);
                    setTagName("");
                });
            }
            );
        }
    };

    useEffect(() => {
        api.getTags().then((res) => {
            console.log(res.data);
            setTags(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (<div className="w-75 mx-auto pb-3">
        <div className="border rounded my-3 bg-white">
            <h1 className="bg-primary rounded text-white p-3">Tag Article</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="pb-3 ms-2" id="add-tag-form">
                {tags.map((tag) => {
                    return (
                        <Form.Check key={tag.id} label={tag.content} type="checkbox" name="tag" id={tag.id} onChange={(e) => {
                            let tagId = {tag_id: tag.id};
                            if (e.target.checked) {
                                api.addTagToArticle(id, tagId).then(() => {
                                    api.getTags().then(tags => {
                                        setTags(tags.data);
                                    });
                                }
                                );
                            } else {
                                api.removeTagFromArticle(id, tagId).then(() => {
                                    api.getTags().then(tags => {
                                        setTags(tags.data);
                                    });
                                }
                                );
                            }
                        }} />
                    );
                })}

            </Form>
            <p className="ms-2">Tag not there?</p>
            <Form noValidate validated={validatedAddTag} onSubmit={handleAddTag} className="pb-3 ms-2" id="add-tag">
                <Form.Group className="col-md-4" controlId="add-tag">
                    <Form.Control className="mb-3" type="text" placeholder="Tag Name" value={tagName} onChange={(e) => setTagName(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">
                        Please enter a tag name.
                    </Form.Control.Feedback>
                </Form.Group>
                <button type="submit" form="add-tag" className="btn btn-primary">Add tag</button>
            </Form>
        </div>

        <Link to="/" class="btn btn-danger me-3">Cancel</Link>

        <button class="btn btn-success" type="submit" form="add-tag-form">Submit</button>
    </div>
    )
}