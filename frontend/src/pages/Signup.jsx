import React from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4 m-20 ">
            <Heading label={"Signup"} />
            <Subheading label={"Enter your information to create an account"} />
            <Input label={"Username"} placeholder={"john@gmail.com"} />
            <Input label={"First Name"} placeholder={"John"} />
            <Input label={"Last Name"} placeholder={"Doe"} />
            <Input label={"Password"} placeholder={"******"} />
            <Button label={"Signup"} />
            <div className="m-3">
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
