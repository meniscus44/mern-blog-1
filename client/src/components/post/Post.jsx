import { Link } from "react-router-dom";
import "./post.css";

export default function Post(props) {
  return (
    <div className="post">
      <img
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
        className="postImg"
      />
      <div className="postInfo">
        <div className="postCats">
          {props.post.categories.map((c) => {
            return (
              <span key={c} className="postCat">
                {c}
              </span>
            );
          })}
        </div>
        <Link className="link" to={`/post/${props.post._id}`}>
          <span className="postTitle">{props.post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(props.post.updatedAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{props.post.description}</p>
    </div>
  );
}
