import { useEffect, useState } from "react";
import Post from "../components/Post"
import { apiURL } from "../components/Domain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getRecent = async () => {
            try {
                const response = await fetch(`${apiURL}/post/recent`);
                const data = await response.json();
                setPosts(data);
            } catch(err) {
                console.log({msg:err});
                toast.error(`${JSON.stringify(err)}`, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        }
        getRecent();
    }, []);

    return (
        <>
            {posts.length ? posts.map(post => (
                <Post {...post} />
            )) : ''}
            <ToastContainer />
        </>
    )
}

export default IndexPage;