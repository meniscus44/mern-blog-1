import "./write.css";
import {useContext, useState} from 'react';
import {Context} from "../../Context/Context";
import axios from "axios";
import Toast from "../../components/CustomToast";

export default function Write() {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [file,setFile] = useState(null);
  const { user } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const newPost={
          title,
          desc,
      };
      if(file) {
          const data = new FormData();
          const filename= Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          newPost.photo = filename;
          try{
            await axios.post("/api/image/upload", data);
          }
          catch(err) {
            setError(true);
          }
      }
      try{
        const res = await axios.post("/api/post/addpost", {newPost},
        {
          headers:{
            "auth-token":user.authToken,
          },
        });
        window.location.replace("/api/post/getpost/"+res.data._id);
      }
      catch(err) {}
  };
  
  
  return (
    <div className="write">
      {file && 
        (<img className="writeImg" src={URL.createObjectURL(file)} alt="" />)
      }
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={e => setFile(e.target.files[0])}/>
                <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={(e) => setTitle(e.target.value)} required/>
            </div>
            <div className="writeFormGroup">
                <textarea placeholder="Tell your story..." type="text" className="writeInput writeText" onChange={(e) => setDesc(e.target.value)} required></textarea>
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
        <div className="error-msg"> 
          { error && <Toast msgType="error" message="Something Went Wrong !"/>}
        </div>
    </div>
  )
}
