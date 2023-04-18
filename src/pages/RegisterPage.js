import { useContext, useState } from 'react';
import { UserContext } from '../components/UserContext';
import { Navigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function register(ev) {
        ev.preventDefault();

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if(response.ok) {
            response.json().then(UserInfo => {
                setUserInfo(UserInfo);
                setRedirect(true);
            })
        } else {
            alert("try again!")
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button>Register</button>
        </form>
    )
}

export default RegisterPage;