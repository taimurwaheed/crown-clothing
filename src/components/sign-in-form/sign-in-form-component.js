import React, { useState, useContext } from "react";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase-utils";

import FormInput from "../form-input/form-input-component";
import "./sign-in-form-component.scss";
import Button from "../button/button-component";
import { UserContext, UserProvider } from "../../context/user-context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setformFields(defaultFormFields);
  };

  const SignInGooglUser = async () => {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;

        case "auth/user-not-found":
          alert("User not found");
          break;

        default:
          console.log(error);
      }
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={SignInGooglUser}>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
