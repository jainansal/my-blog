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
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        image: '',
        content: ''
    })
    const [redirect, setRedirect] = useState(false);
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch(apiURL+'/post/'+id).then(
            response => {
                response.json().then(postInfo => {
                    setFormData({
                        title: postInfo.title,
                        summary: postInfo.summary,
                        content: postInfo.content,
                        image: postInfo.image
                    })
                })
            }
        )
    }, [])

    async function editPost(ev) {
        ev.preventDefault();
        const data = JSON.stringify(formData);        
        const response = await fetch(apiURL+ '/post/'+id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: data,
            credentials: 'include'
        });
        
        if(response.ok) {
            setRedirect(true);
        } else {
            alert("Some error occured");
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
                name="title"
                value={formData.title}
                onChange={ev => handleChange(ev)} />
            <input
                type="text"
                placeholder="Summary"
                name="summary"
                value={formData.summary}
                onChange={ev => handleChange(ev)} />
            <input
                type="text"
                placeholder="Image address"
                name="image"
                value={formData.image}
                onChange={ev => handleChange(ev)} />
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={formData.content}
                onChange={newContent => setFormData(prevData => ({ ...prevData, content: newContent }))} />
            <button style={{ marginTop: '5px', background: '#2196f3' }}>Update</button>
        </form>
    )
}