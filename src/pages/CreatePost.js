import { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { modules, formats } from '../components/QuillComps';
import { apiURL } from '../components/Domain';

function CreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        image: '',
        content: ''
    });
    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    async function createNewPost(ev) {
        ev.preventDefault();
        console.log(formData)
        const data = formData;
        const response = await fetch(apiURL + '/post/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(data),
            credentials: 'include'
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    const handleChange = (ev) => {
        ev.preventDefault();
        const { name, value } = ev.target;
        setFormData(prevData => (
            {
                ...prevData,
                [name]: value
            }
        ));
    }

    if (redirect || userInfo === null) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <input
                type="text"
                placeholder="Title"
                name='title'
                value={formData.title}
                onChange={ev => handleChange(ev)} />
            <input
                type="text"
                placeholder="Summary"
                name='summary'
                value={formData.summary}
                onChange={ev => handleChange(ev)} />
            <input
                type="text"
                placeholder="Image address"
                name='image'
                value={formData.image}
                onChange={ev => handleChange(ev)} />
            <ReactQuill
                theme='snow'
                modules={modules}
                formats={formats}
                value={formData.content}
                onChange={newContent => setFormData(prevData => ({ ...prevData, content: newContent }))} />
            <button style={{ marginTop: '5px', background: '#2196f3' }}>Publish</button>
        </form>
    )
}

export default CreatePost;