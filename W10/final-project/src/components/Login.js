import { useState, useEffect } from 'react';

const Login = () => {

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // Grabbing the backend data
  const [backendData, setBackendData] = useState([{}]);
  
  // This is temporary for seeing if login is successful - DELETE LATER
  const [success, setSuccess] = useState(false);

  // For when component loads - happens only ONCE
  useEffect(() => {
    // Grab back end data
    fetch("/api").then(
      res => res.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, [])

  // For when there is an error - when user changes username or password, it refreshes and set the error message to blank
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  // Login Function
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      for(const data of backendData) {
        if(data.name == user && data.password == pwd) {
          return await setSuccess(true);  
        }
      }
      setUser('');
      setPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status == 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      } 
    } finally {
      // MENTOR QUESTION: Why does this return false, even when setSuccess is set to true when the id/pw match? 
      console.log(success);
    }
  }

  return (
    <>
      { success ? (
        // Currently, if login is successful, login screen below is NOT rendered (this is within ternary operator)
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            {/* Placeholder to home link */}
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : ( 
        <section>
          {/* Error message display - aria-live attribute is for screen reader to announce the error immediately when focus is set on it*/}
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username"
              autoComplete="off"
              onChange={(event) => setUser(event.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              onChange={(event) => setPwd(event.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?<br />
            <span className="line">
              {/* Placeholder link - react router link to be inputted later */}
              <a href="#">Sign Up</a>  
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Login
