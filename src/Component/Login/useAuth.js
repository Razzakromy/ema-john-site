import React, { useContext, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const getUser = (user) => {
  const { displayName, email, photoURL } = user;
  return { name: displayName, email, photo: photoURL };
};

const Auth = () => {
  const [user, setuser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const signedInUser = getUser(res.user);
        setuser(signedInUser);
        return res.user;
      })
      .catch((err) => {
       
        setuser(null);
        return err.message;
      });
  };

  const signOut = () => {
   return firebase
      .auth()
      .signOut()
      .then(function () {
        setuser(null);
      })
      .catch(function (error) {
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const currUser = getUser(usr);
        setuser(currUser);
      } else {
      }
    });
  }, []);
  return {
    user,
    signInWithGoogle,
    signOut,
  };
};

export default Auth;
