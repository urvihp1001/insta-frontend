const Login=()=>
{
  const loginurl="https://api.instagram.com/oauth/authorize?client_id=CLIENT_ID&redirect_uri=http://localhost:3000/callback&scope=user_profile,user_media&response_type=code"
  return(
    <div style={{textAlign:"center",marginTop:"50px"}}>
      <a href={loginurl} style={{
        padding:'10px 20px',
        background:'#e1306c',
        color:'white',
        borderRadius:'5px'
      }}>Login with Instagram</a>


    </div>
  );
};
export default Login;
  