import { useContext, useEffect, useState } from "react";
import { Link, Navigate, NavigationType } from "react-router-dom";
import { UserContext } from "./UserContext";
import { apiURL } from "./Domain";

function Header() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(apiURL + '/profile', {
            credentials: 'include'
        }).then(response => {
            response.json().then(UserInfo => {
                setUserInfo(UserInfo);
            })
        })
    }, []);

    function logout() {
        fetch (apiURL + '/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className='logo'>Hello{username?', '+username:' there'}</Link>
            <nav>
                {username && (
                    <>
                        <Link to='/create'>New post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;