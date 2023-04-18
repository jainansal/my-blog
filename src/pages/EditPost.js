import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import { UserContext } from "../components/UserContext";
import ReactQuill from "react-quill";
import { apiURL } from "../components/Domain";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function EditPost() {
    const { id } = useParams();
    const [postTitle, setPostTitle] = useState('');
    const [postSummary, setPostSummary] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch(apiURL+'/post/'+id).then(
            response => {
                response.json().then(postInfo => {
                    // postTitle = postInfo.title;
                    setPostTitle(postInfo.title);
                    setPostSummary(postInfo.summary);
                    setPostContent(postInfo.content);
                    // setPostImage(postInfo.image);
                })
            }
        )
    }, [])

    async function editPost(ev) {
        ev.preventDefault();
        const data = new FormData;
        data.set('title', postTitle);
        data.set('summary', postSummary);
        data.set('image', postImage?.[0])
        data.set('content', postContent);
        
        const response = await fetch(apiURL+ '/post/'+id, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
        
        if(response.ok) {
            console.log('ok');
            setRedirect(true);
        } else {
            alert("Some error occured");
        }
    }

    if(redirect || userInfo === null) {
        return (
            <Navigate to={`/post/${id}`} />
        )
    }

    return (
        <form onSubmit={editPost}>
            <input
                type="text"
                placeholder="Title"
                value={postTitle}
                onChange={ev => setPostTitle(ev.target.value)} />
            <input
                type="text"
                placeholder="Summary"
                value={postSummary}
                onChange={ev => setPostSummary(ev.target.value)} />
            <input
                type="file"
                onChange={ev => setPostImage(ev.target.files)} />
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={postContent}
                onChange={newContent => setPostContent(newContent)} />
            <button style={{ marginTop: '5px', background: '#2196f3' }}>Update</button>
        </form>
    )
}