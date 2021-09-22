import React from "react";
import authService, { auth } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    let provider;
    if (name === "google") {
      provider = new authService.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new authService.GithubAuthProvider();
    }

    let data;
    if (provider) {
      data = await authService.signInWithPopup(auth, provider);
    }
    console.log("social login data: ", data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
