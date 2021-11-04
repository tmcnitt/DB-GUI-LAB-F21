import React from 'react';
import { Link } from 'react-router-dom';

export const Add = () => {

    return (
        <div>
        <h1>Add Article</h1>
        <form id="add-article-form">
            <label>
                Name:
                <input type="text" name="name" />
            </label>        
        </form>
        <Link to="/" class="btn btn-danger">Cancel</Link>

        <Link to="/" class="btn btn-success" type="submit" form="add-article-form" value="Submit">Submit</Link>

        </div>
    );
}