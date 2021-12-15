import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Navigation from "../Nagivation";
import {API_URL} from "../consts";

const SearchScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const movieTitle = params.searchTerm || 'batman'
    const [searchTerm, setSearchTerm] = useState(movieTitle);
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState({});


    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include' //Support for cookie, session
        }).then(res => res.json())
            .then(user => {
                setUser(user);
            })
            //.catch(e => navigate('/login'));  //If not login, redirect to login page
    }

    const findMovies = () => {
        navigate(`/search/${searchTerm}`);
        fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=dd364505`)
            .then(res => res.json())
            .then(results => setMovies(results.Search))
    }

    // function isEmpty(obj) {
    //     return Object.keys(obj).length === 0;
    // }


    useEffect(getProfile, [navigate]);

    return (
        <div>
            <Navigation/>
            <div className="m-5">
                <h1>Search</h1>
                <div className="col-3 input-icons">
                    <input className="form-control rounded-corners-all-around"
                           placeholder="Search Movie"
                           onChange={
                               (e) => setSearchTerm(e.target.value)} value={searchTerm}/>
                </div>
                <button className="btn btn-primary m-2"  onClick={findMovies}>Search</button>
            </div>
            <div className="container-fluid">
                <div className="row m-2">
                    {
                        //console.log(movies)
                        movies &&
                        movies.map(movie =>
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

                    {!movies && <label>No results find</label>}
                </div>
            </div>
            <div className="list-group-item bottom-0">
                <Link to="/privacy">
                    Privacy
                </Link>
            </div>
        </div>
    )
};

export default SearchScreen;
