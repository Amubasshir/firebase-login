import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';




initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App()
{
  const [user, setUser] = useState({});
  const auth = getAuth();
  const googleHandleSignIn = () =>
  {
   
    signInWithPopup(auth, googleProvider)
      .then( result =>
      {
        const {displayName, email, photoURL} = result.user;
        const loggedInUser ={
          name: displayName,
          email: email,
          image: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch(error =>
      {
        console.log(error.message);
    })
  }

  const handleGitHubSignIn = () =>
  {
    signInWithPopup(auth, gitHubProvider)
      .then((result) =>
      {
        const { displayName, email, } = result.user;
        const loggedInUser ={
          name: displayName,
          email: email,
        };
        setUser(loggedInUser);
    })
  }

  const handleSignOut = () =>
  {
  
    signOut(auth)
    .then(() =>
    {
      setUser({});
    })
  }
  return (
    <div className="App">
      {
        !user.name?
        <div>
      <button onClick={googleHandleSignIn}>google sign in</button>
      <button onClick={handleGitHubSignIn}>github sign in</button>
 </div> :
      <button onClick={handleSignOut}>Sign out</button>}
      <br />
      {
              user.name && <div>
          <h2>Welcome {user.name} </h2>
          <h6>fix { user.email} as soon as possible</h6>
            </div>
}
    </div>
  );
}

export default App;
