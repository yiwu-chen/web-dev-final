import './vendors/bootstrap/css/bootstrap.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';

import './App.css';
import SearchScreen from "./SearchScreen/SearchScreen";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DetailsScreen from "./DetailsScreen/DetailsScreen";
import Home from "./Home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import Profile from "./login/Profile";
import PublicProfile from "./login/PublicProfile";

import users from "./Reducers/users"
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import Privacy from "./Privacy/Privacy";

const reducer = combineReducers({users: users});
const store = createStore(reducer);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/profile" element={<Profile/>}/>


                    <Route path="/profile/:uid" element={<PublicProfile/>}/>

                    {/*<Route path="/profile/:uid" element={<Profile/>}/>*/}

                    {/*<Route path="/users/:uid" element={<PublicProfile/>}/>*/}


                    <Route path='/search' element={<SearchScreen/>}></Route>
                    <Route path='/search/:searchTerm' element={<SearchScreen/>}></Route>
                    {/*<Route path = '/' element ={<SearchScreen/>}></Route>*/}
                    <Route path='/details/:id' element={<DetailsScreen/>}></Route>

                    <Route path="/privacy" element={<Privacy/>}/>

                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
