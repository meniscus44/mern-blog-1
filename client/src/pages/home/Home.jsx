import "./home.css";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [post, setPost] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/post/fetchallposts" + search);
      setPost(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      {!search &&<Header />}
      <div className="home">
        <Posts posts={post} />
       {post && <Sidebar />}
      </div>
    </>
  );
}
