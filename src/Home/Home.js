import Navigation from "../Nagivation";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {API_URL} from "../consts";

const Home = () => {
    const params = useParams();
    const navigate = useNavigate();

    //Get current user profile in the states
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);


    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
            })
        //.catch(e => navigate('/login'));
    }

    const getUsers = () => {
        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(users => {
                setUsers(users);
            })
    }


    const movieTitle = params.searchTerm || 'batman'
    const [searchTerm, setSearchTerm] = useState(movieTitle);
    const [movies, setMovies] = useState([]);

    const findMovies = () => {
        navigate(`/${searchTerm}`);
        fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=852159f0`)
            .then(res => res.json())
            .then(results => setMovies(results.Search))
    }

    useEffect(getProfile, [navigate]);
    useEffect(getUsers, []);

    function Example() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    }


    return (
        <>
            <Navigation/>
            {/*{JSON.stringify(users)}*/}
            <div className="row m-5">
                {/*{JSON.stringify(user)}*/}
                <h1>Home {user.username}</h1>
                {/*<h5>{user.favMovies}</h5>*/}
                <div className="mt-4">
                    <h4>View other users's profile</h4>
                    <div className="list-group w-25">
                        {
                            users.map(user =>
                                <Link to={`/profile/${user._id}`}>
                                    <p className="list-group-item list-group-item-action">{user.username}</p>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="list-group-item bottom-0 ">
                <Link to="/privacy">
                    Privacy
                </Link>
            </div>
        </>
    )
};

export default Home;
