import React from "react";

import "./authentication-component.scss";

import SignUpForm from "../../components/sing-up-form/sign-up-form-component";
import SignInForm from "../../components/sign-in-form/sign-in-form-component";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
