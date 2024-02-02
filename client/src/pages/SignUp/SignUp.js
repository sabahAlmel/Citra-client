import React from "react";
import SignUpp from "../../components/SignUp/SignUp";
import style from "../SignUp/SignUp.module.css";

function SignUp() {
  return (
    <div className={style.container}>
      <SignUpp />
    </div>
  );
}

export default SignUp;
