import React from "react";
import Signin from "../../components/signin/Signin";
import style from "../SignIn/SignIn.module.css"

function SignIn() {
  return(
  <div className={style.container}>
   <Signin />
  </div>
  )
}

export default SignIn;
