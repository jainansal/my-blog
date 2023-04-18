import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function Post({ _id, title, image, summary, createdAt, author }) {
    const formattedDate = format(new Date(createdAt), 'MMM d, yyyy | HH:MM');

    return (
        <Link to={'/post/'+_id} className="post">
            <div className="image">
                    {image && (
                        <img src={'http://localhost:4000/' + image} />
                    )}
            </div>
            <div className="texts">
                    <h2>{title}</h2>
                <p className="info">
                    <a href="" className="author">{author.username}</a>
                    <time>{formattedDate}</time>
                </p>
                <p className='summary'>{summary}</p>
            </div>
        </Link>
    );
}

export default Post;