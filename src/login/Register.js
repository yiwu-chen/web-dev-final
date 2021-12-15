import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {API_URL} from "../consts";
import Navigation from "../Nagivation";

const Register = () => {
    const [user, setUser] = useState({username: 'alice', password: 'alice123', role: 'general'});
    const navigate = useNavigate();

    const register = () => {
        fetch(`${API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',  //Include cookie
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => navigate('/profile'));
        //.catch(()=>{}); //If catch an error
    };

    return (
        <div>
            <Navigation/>
            <div className="m-5">

                <h2>Register</h2>

                <label>Type your user name</label>
                <input
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                    className="form-control w-25"
                />
                <br/>

                <label>Type your password</label>
                <input
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                    type="password"
                    className="form-control w-25"/>

                <br/>
                <label>Type your email address</label>
                <input
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                    type="email"
                    className="form-control w-25"/>

                <br/>
                <label>Select your account role</label>
                <label>Select your role:</label><br/>
                <input type="radio" value="admin"
                       onChange={(e) => setUser({...user, role: e.target.value})}
                       name="radio-role" id="radio-admin"/>
                <label htmlFor="radio-admin">admin</label><br/>

                <input type="radio" value="general"
                       onChange={(e) => setUser({...user, role: e.target.value})}
                       name="radio-role" id="radio-general"/>
                <label htmlFor="radio-general">general</label><br/>

                <input type="radio" value="proUser"
                       onChange={(e) => setUser({...user, role: e.target.value})}
                       name="radio-role" id="radio-proUser"/>
                <label htmlFor="radio-general">pro</label><br/>

                <br/>
                <button
                    className="btn btn-primary"
                    onClick={register}>
                    Register
                </button>

                {JSON.stringify(user)}
            </div>
        </div>
    );
};
export default Register;