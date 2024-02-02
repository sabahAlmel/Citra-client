import React from "react";
import SignUpp from "../../components/SignUp/SignUp";
import style from "../SignUp/SignUp.module.css";
import { Helmet } from "react-helmet-async";


function SignUp() {
  return (
    <div className={style.container}>
       <Helmet>
      <title>اشترك الان</title>
      <meta name="description" content ="اشترك الان"></meta>
      <link rel="canoncial"  href="/signup"/>
    </Helmet>
      <SignUpp />
    </div>
  );
}

export default SignUp;
