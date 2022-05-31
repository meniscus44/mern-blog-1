import Post from "../post/Post"
import "./posts.css"

export default function Posts(props) {
  return (
    <div className="posts">
      
      {props.posts.map((p)=>{
         return (
         <Post key={p._id} post={p} />
         )
      })}
        
    </div>
  )
}
