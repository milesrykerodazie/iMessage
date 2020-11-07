import React, { useEffect } from "react";
import "./App.css";
import IMessage from "./Components/IMessage";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import Login from "./Components/Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          }),
        );
      } else {
        //user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return <div className="app">{user ? <IMessage /> : <Login />}</div>;
}

export default App;
