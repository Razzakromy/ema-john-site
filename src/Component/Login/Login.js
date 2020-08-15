import React from "react";
import "./Login.css";
import Auth from "./useAuth";

const Login = () => {
  const auth = Auth();
  const handleSignIn = () => {
    auth.signInWithGoogle().then((res) => {
      window.location.pathname = "/review";
    });
  };
  const handleSignOut = () => {
    auth.signOut().then(res =>{
      window.location.pathname = "/"
    })
  }

  return (
    <div className="container">
      <h1 className="bg-success">Join the party!!</h1>
      {auth.user ? (
        <button className="btn btn-dark" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <button onClick={handleSignIn} className="btn btn-warning">
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Login;
