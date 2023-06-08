import { useContext, useEffect, useState } from "react";
import { Link, Navigate, NavigationType } from "react-router-dom";
import { UserContext } from "./UserContext";
import { apiURL } from "./Domain";

function Header() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(apiURL+'/user/my', {credentials: 'include'});
                if(!response.ok) {
                    throw new Error("Couldn't fetch user information");
                }
                const data = await response.json();
                setUserInfo(data);
            } catch(err) {
                console.log({msg:err});
            }
        }
        getUser();
    }, []);

    // console.log(userInfo);

    const logout = async () => {
        try {
            const response = await fetch (apiURL + '/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setUserInfo(null);
        } catch(err) {
            console.log({msg:err})
        }
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className='logo'>Hello {username ? username: 'there'}</Link>
            <nav>
                {
                    username ? (
                        <>
                            <Link to='/create'>New post</Link>
                            <a onClick={logout}>Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                }
            </nav>
        </header>
    );
}

export default Header;