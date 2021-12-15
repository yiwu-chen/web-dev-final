import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URL} from "../consts";
import Navigation from "../Nagivation";

const Login = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const getUsers = () => {
        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(users => {
                setUsers(users);
            })
    }

    useEffect(getUsers, []);

    const login = () => {
        fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => {
            navigate('/profile')
        }).catch(() => {
            console.log("!!!!")
        });
    }

    return (
        <div>
            <Navigation/>
            <div className="m-5">
                <h1>Login</h1>
                <label>User Name:</label><input
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                    className="form-control w-25"/>
                <br/>
                <label>Password:</label><input
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                    type="password"
                    className="form-control w-25"/>
                <br/>
                <button
                    className="btn btn-primary"
                    onClick={login}>
                    Login
                </button>
                <br/>
                <br/>
                <Link to="/register" >
                    Register a new user
                </Link>
            </div>


        </div>
    );
};
export default Login;