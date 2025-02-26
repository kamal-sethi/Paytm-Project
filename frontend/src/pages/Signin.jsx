import React from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";


const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 h-max text-center p-2 px-4 m-20 ">
          <Heading label={"Welcome Back!"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <Input label={"Username"} placeholder={"john@gmail.com"} />
          <Input label={"Password"} placeholder={"*****"} />
          <Button label={"Sign in"}/>
          <div className="m-3">New User? Create account <Link to='/signup' className="underline">Sign Up</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
