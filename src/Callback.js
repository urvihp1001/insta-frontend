import { useEffect, useState } from "react";
import axios from "axios"

const Callback=()=>
{
    const [profile, setProfile]=useState(null);
    const [media, setMedia]=useState([]);

    useEffect(()=>
    {
        const code= new URLSearchParams(window.location.search).get("code");
        axios.post("${process.env.REACT_APP_BACKEND_URL}/auth/instagram",{code}).then((res)=>
        {
const token=res.data.access_token;
axios.get("${process.env.REACT_APP_BACKEND_URL}/profile?access_token=${token}").then((p)=>setProfile(p.data));
axios.get("${process.env.REACT_APP_BACKEND_URL}/media?access_token=${token}").then((m)=>setMedia(m.data.data));
        });
    },[]);

    return (
<div style={{padding:20}}>
    {profile &&(
        <div>
            <h2>
                {profile.username}
            </h2>
            <p>
                Account Type: {profile.account_type}
            </p>
        </div>
    )}
<div>
    {
        media.map((item)=>(
            <div key={item.id} style={{border:"1px solid #ccc",marginBottom:10,padding:10}}>
                <img src={item.media_url} alt="" width="200"/>
                <p>{item.caption}</p>
                <CommentBox mediaid={item.id}/>
                </div>
        ))
    }
</div>
</div>
    );
};

const CommentBox=({mediaid})=>{
const [comment, setComment]=useState("");
const postComment=()=>{
    axios.post("${process.env.REACT_APP_BACKEND_URL}/comment",{mediaid,comment});
    setComment("");
};
return(
    <div>
        <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Reply..."/>
        <button onClick={postComment}>Reply</button>
    </div>
)
};
export default Callback;