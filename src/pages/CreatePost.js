import { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { modules, formats } from '../components/QuillComps';
import { apiURL } from '../components/Domain';

function CreatePost() {
    const [postTitle, setPostTitle] = useState('');
    const [postSummary, setPostSummary] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {userInfo, setUserInfo} = useContext(UserContext);

    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData;
        data.set('title', postTitle);
        data.set('summary', postSummary);
        if(postImage) data.set('image', postImage[0]);
        data.set('content', postContent);
        
        const response = await fetch(apiURL + '/new-post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });

        if(response.ok) {
            setRedirect(true);
        }
    }

    if(redirect || userInfo === null) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <input 
                type="text" 
                placeholder="Title" 
                value={postTitle} 
                onChange={ev => setPostTitle(ev.target.value)}/>
            <input 
                type="text" 
                placeholder="Summary" 
                value={postSummary} 
                onChange={ev => setPostSummary(ev.target.value)}/>
            <input 
                type="file" 
                onChange={ev => setPostImage(ev.target.files)}/>
            <ReactQuill 
                theme='snow'
                modules={modules}
                formats={formats}
                value={postContent}
                onChange={newContent => setPostContent(newContent)}/>
            <button style={{ marginTop: '5px', background: '#2196f3' }}>Publish</button>
        </form>
    )
}

export default CreatePost;