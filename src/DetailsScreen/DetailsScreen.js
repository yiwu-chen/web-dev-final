import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Navigation from "../Nagivation";
import {API_URL} from "../consts";

const DetailsScreen = () => {
    const params = useParams();
    const [movieDetails, setMovieDetails] = useState({Actors: ''});
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const [movie, setMovie] = useState({likedBy: []});
    const [movieInfo, setMovieInfo] = useState({likedBy: []});

    const [comment, setComment] =useState({});
    const [comments, setComments] = useState([]);


    const findMovieDetailsByImdbID = () => {
        console.log("findMovieDetailsByImdbID");

        fetch(`http://www.omdbapi.com/?apikey=852159f0&i=${params.id}`)
            .then(res => res.json())
            .then(
                movie => {
                    setMovieDetails(movie);
                    createMovie(movie);
                }
            ).then(res => getMovieByImdbId());
    }

    const getProfile = () => {
        console.log("getProfile");
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
            })
    }

    const updateUser = () => {
        fetch(`${API_URL}/updateUser`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    //Movie
    const createMovie = (_movie) => {
        movie.imdbID = _movie.imdbID;
        movie.Title = _movie.Title;
        fetch(`${API_URL}/createMovie`, {
            method: 'POST',
            body: JSON.stringify(movie),
            credentials: 'include',  //Include cookie
            headers: {
                'content-type': 'application/json'
            }
        })
    };

    const getMovieByImdbId = () => {
        fetch(`${API_URL}/movies/${params.id}`)
            .then(res => res.json())
            .then(res => {
                setMovieInfo(res);
            }).then(res => getAllComments(res));
    }

    const updateMovie = () => {
        //Avoid duplicate users
        if (movie.likedBy.indexOf(user) == -1) {
            movie.likedBy.push(user);
        }
        fetch(`${API_URL}/updateMovie`, {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }


    const addToFavMovies = (movieDetails) => {
        if (!isEmpty(user)) {
            if (user.favMovies.indexOf(movieDetails) == -1) {
                user.favMovies.push(movieDetails);
            }
            updateUser();
            updateMovie();
        } else {
            console.log("Not logged in");
        }
    }




    //Add Comments

    const createCommentClickHandler = () => {
        fetch(`${API_URL}/createComment`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(movieComments => {
                // setComment(movieComments);
                comments.push(movieComments);
            });
    }


    const onCommentTextChange = (event) =>
        setComment({...comment, content: event.target.value, author: user.username,imdbID: movieDetails.imdbID});


    const getAllComments = (res) => {
        fetch(`${API_URL}/comments`)
            .then(res => res.json())
            .then(res => {
                let allComments = res.filter(
                    function (e) {
                        return e.imdbID == movie.imdbID;
                    }
                )
                setComments(allComments);
            })
    }


    useEffect(getProfile, [navigate]);

    useEffect(findMovieDetailsByImdbID, []);


    return (
        <div>
            <Navigation/>
            <div className="m-5">
                <h1>Details</h1>
                <h3>{movieDetails.Title} ({movieDetails.Year} {movieDetails.Rated})</h3>
                Directed by: {movieDetails.Director}
                <br/>
                {movieDetails.imdbID}
                <br/>
                <img src={movieDetails.Poster} height={200}/>
                <br/>
                <p>
                    {movieDetails.Plot}
                </p>
                <h4>Cast</h4>
                <ul>
                    {
                        movieDetails.Actors.split(',').map(actor =>
                            <li key={actor}>
                                {actor}
                            </li>
                        )
                    }
                </ul>

                {
                    !isEmpty(user) &&
                    <button className="btn btn-primary" onClick={() => {
                        addToFavMovies(movieDetails)
                    }}>Add to favourite movies
                    </button>
                }

                {
                    isEmpty(user) && <h5>You need to login to add this movie to your favourite</h5>
                }
                <br/>
                <div className="mt-4">
                    <h4>Other users also liked this movie</h4>
                    <div className="list-group w-25">
                        {
                            movieInfo.likedBy.map(user =>
                                <Link to={`/profile/${user._id}`}>
                                    <p className="list-group-item list-group-item-action">{user.username}</p>
                                </Link>
                            )
                        }
                    </div>
                </div>

                {
                user.role == 'proUser' | user.role == 'admin' && <div>
                    <h3>Add Comments</h3>
                    <ul className="list-group">
                        <li className="list-group-item">

                            <button
                                onClick={createCommentClickHandler}
                                className="btn btn-success float-end">
                                Create
                            </button>

                            <br/>

                            <input className="form-control"
                                   onChange={onCommentTextChange}
                                   style={{width: "70%"}}/>
                        </li>
                        {
                            comments.map((comment) =>
                                <li key={comment._id} className="list-group-item">

                                    {comment.content}
                                    {' : '}
                                    {
                                        <label className="color-blue">{comment.author}</label>}
                                </li>
                            )
                        }
                    </ul>
                </div>
                }
            </div>
        </div>
    );
};

export default DetailsScreen;