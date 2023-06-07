import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { apiURL } from './Domain';

function Post(props) {

    console.log(props.author);

    const formattedDate = format(new Date(props.createdAt), 'MMM d, yyyy | HH:MM');

    return (
        <Link to={'/post/'+props._id} className="post">
            <div className="image">
                    {props.image && (
                        <img src={props.image} />
                    )}
            </div>
            <div className="texts">
                    <h2>{props.title}</h2>
                <p className="info">
                <a href="" className="author">{props.author?.username}</a>
                    <time>{formattedDate}</time>
                </p>
                <p className='summary'>{props.summary}</p>
            </div>
        </Link>
    );
}

export default Post;