import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Navigation = () => {
    const users = useSelector((state) => state.users);

    return (
        <div className="list-group contain">
            <div className="row col-md-4 offset-md-4 contain">
                {/*{JSON.stringify(users)}*/}
                <div className="list-group-item col-3 ">
                    <Link to="/" >
                        Home
                    </Link>
                </div>

                <div className="list-group-item col-3 ">
                    <Link to="/search" >
                        Search
                    </Link>
                </div>

                <div className="list-group-item col-3">
                    <Link to="/profile">
                        Profile
                    </Link>
                </div>

                <div className="list-group-item col-3 ">
                    <Link to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Navigation;