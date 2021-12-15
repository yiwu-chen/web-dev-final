import {useEffect, useState} from "react";
import {API_URL} from "../consts";
import {Link, useNavigate, useParams} from "react-router-dom";
import Navigation from "../Nagivation";

const Profile = () => {
    const params = useParams();

    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getUsers = () => {
        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(users => {
                setUsers(users);
            })
    }

    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
            }).catch(e => navigate('/login'));
    }

    const logout = () => {
        fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => navigate('/'));
    }

    const updateUser = () => {
        fetch(`${API_URL}/updateUser`, {
            method: 'PUT',
            body: JSON.stringify(user),
            //credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => navigate('/'));
    }

    const deleteUserById = (id) => {
        fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        }).then(res => window.location.reload(false))
    }

    useEffect(getProfile, [navigate]);
    useEffect(getUsers, []);

    return (
        <div>
            <Navigation/>
            <div className="m-5">
                <h1>Profile</h1><label> Role: {user.role}</label><br/>

                <label>User name</label>
                <input
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                    className="form-control w-25"/>
                <br/>

                <label>Password</label>
                <input
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                    type="password"
                    className="form-control w-25"/>
                <br/>

                <label>Email</label>
                <input
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                    className="form-control w-25"/>

                <br/>
                {/*<label>{user.favMovies}</label>*/}
                <button
                    onClick={updateUser}
                    className="btn btn-primary m-2">
                    Save
                </button>
                <button
                    onClick={logout}
                    className="btn btn-warning m-2">
                    Logout
                </button>
                <br/> <br/>

                <div/>
                {
                    user.role == 'admin' &&
                    <div className="">
                        <h4>Manage other users</h4>
                        <div className="list-group w-25">
                            {
                                users.map(user =>
                                    <Link to={`/profile/${user._id}`}>
                                        <div className="card m-1">
                                            <div className="list-group-item">
                                                <div className="float-left">{user.username}</div>
                                                <button className="btn btn-danger float-right"
                                                        onClick={() => deleteUserById(user._id)}>Delete
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
export default Profile;