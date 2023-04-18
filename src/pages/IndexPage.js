import { useEffect, useState } from "react";
import Post from "../components/Post"
import { apiURL } from "../components/Domain";

function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(apiURL + '/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);

    return (
        <>
            {posts.length && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    )
}

export default IndexPage;