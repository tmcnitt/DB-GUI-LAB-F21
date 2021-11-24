import React from "react";
import { ApiMain } from ".";

export const Comment = (props) => {
    const api = new ApiMain();

    return (
        <div class="rounded mb-3 mx-auto bg-white overflow-auto">
            <div>
            <img class="float-start mx-3 mt-2" src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-150x150.jpg" width="100"></img>
            <h3 id="information-card-title" class="pt-2">{props.comment.username}</h3>
            <p class="ms-2">{props.comment.comment}</p>
            </div>
        </div>
    )
}