import React from "react";
// import authService, { auth } from "fbase";
import { auth } from "fbase";
import AuthForm from "components/AuthForm";
import {
  // createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  // signInWithEmailAndPassword,
  signInWithPopup
} from "@firebase/auth";

const Auth = () => {
  // const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const {
  //     currentTarget: { name }
  //   } = event;
  //   let provider;
  //   if (name === "google") {
  //     provider = new authService.GoogleAuthProvider();
  //   } else if (name === "github") {
  //     provider = new authService.GithubAuthProvider();
  //   }

  //   let data;
  //   if (provider) {
  //     data = await authService.signInWithPopup(auth, provider);
  //   }
  //   console.log("social login data: ", data);
  // };

  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    let token;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          token = credential.accessToken;
        }
      } else if (name === "github") {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          token = credential.accessToken;
        }
      }

      console.log("token", token);
    } catch (error) {
      console.log(error);
    }
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
