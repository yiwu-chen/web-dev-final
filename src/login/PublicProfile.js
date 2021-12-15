import {useEffect, useState} from "react";
import {API_URL} from "../consts";
import {Link, useNavigate, useParams} from "react-router-dom";
import Navigation from "../Nagivation";

const PublicProfile = () => {
    const params = useParams();

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const [favMovies, setFavMovies] = useState([]);

    const getUserByID = () => {
        fetch(`${API_URL}/users/${params.uid}`)
            .then(res => res.json())
            .then(user => {
                setUser(user);
                setFavMovies(user.favMovies)
            })
    }

    useEffect(getUserByID, [navigate]);


    return (
        <div>
            {/*{JSON.stringify(user.favMovies)}*/}
            {/*{JSON.stringify(favMovies)}*/}

            <Navigation/>
            <div className="m-5">
                <h2>Public Profile</h2>
                <h4>User name</h4>
                <h5>{user.username}</h5>
                <br/>
                {/*<label>{user.favMovies}</label> <br/>*/}
                <h4>Favourite movies</h4>

                <div className="container-fluid">
                    <div className="row m-2">
                        {
                            favMovies.map(movie =>
                                <div className="col-lg-2 col-md-3 col-6">
                                    <div className="card edge-danger card-white mt-5">
                                        <Link to={`/details/${movie.imdbID}`}>
                                            <img className="card" src={movie.Poster} height={200}/>
                                            <p><strong>{movie.Title}</strong></p>
                                            <p className="card-text">{movie.Year}</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PublicProfile;