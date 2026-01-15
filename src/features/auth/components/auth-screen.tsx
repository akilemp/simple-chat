"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";


const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");


  return (
    <div className="h-full flex items-center justify-center bg-[#262231]">
      <div className="md:h-auto md:w-[420]">
        {state === "signIn"
          ? <SignInCard setState={setState} />
          : <SignUpCard setState={setState} />}

      </div>
    </div>);
}

export default AuthScreen;