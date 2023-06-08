import { useContext, useState } from 'react';
import { UserContext } from '../components/UserContext';
import { Navigate } from 'react-router-dom';
import { apiURL } from '../components/Domain';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    const register = async (ev) => {
        try {
            ev.preventDefault();
            const response = await fetch(apiURL + '/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            
            const data = await response.json();
            if(data.username) {
                setUserInfo(data);
                setRedirect(true);
            } else {
                throw data;
            }
        } catch(err) {
            console.log(err);
            toast.error(`${JSON.stringify(err)}`, {
                position: toast.POSITION.TOP_RIGHT
              });
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
            <ToastContainer />
        </form>
    )
}

export default RegisterPage;