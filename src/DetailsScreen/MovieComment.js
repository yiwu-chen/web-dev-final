import React, {useEffect, useState} from "react";
import {API_URL} from "../consts";

const MovieComment = () => {

    const [comments, setComments] = useState([]);

    const createReviewClickHandler = () => {
        fetch(`${API_URL}/createComment`, {
            method: 'POST',
            body: JSON.stringify(comments),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(movieComments => setComments(movieComments));
    }


    const onCommentTextChange = (event) =>
        setComments({...comments, content: event.target.value});


    return (
        <>
            <div>
                <h3>Add Comments</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <button
                            onClick={createReviewClickHandler}
                            className="btn btn-success float-end">
                            Create
                        </button>

                        <input className="form-control"
                               onChange={onCommentTextChange}
                               style={{width: "70%"}}/>
                    </li>
                </ul>
            </div>
        </>
    )
};
export default MovieComment;
