import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const didMountRef = useRef(false);
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // console.log(user);
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!user || user === null) {
        history.push("/");
        return;
      }
      axios
        .get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": "770ae354-6d8e-48b7-8296-d63dfa3c1b78",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })
        .then(() => setLoading(false))
        .catch(() => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);
            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("error", e.response));
          });
        });
    }
  }, [user, history]);

  if (!user || loading) return <div />;
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          <img
            src="chatIcon.png"
            alt="icon"
            className="appLogo"
            height="50"
            max-width="50"
          />
          {`  HeyChat`}
        </div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
