import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {username}
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4 m-20 ">
            <Heading label={"Signup"} />
            <Subheading label={"Enter your information to create an account"} />
            <Input
              onChange={(e) => setUsername(e.target.value)}
              label={"Username"}
              placeholder={"john@gmail.com"}
            />
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              label={"First Name"}
              placeholder={"John"}
            />
            <Input
              onChange={(e) => setLastName(e.target.value)}
              label={"Last Name"}
              placeholder={"Doe"}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              label={"Password"}
              placeholder={"******"}
            />
            <Button
              onPress={async () => {
                console.log(username, firstName, lastName, password);
                const response = await axios.post(
                  "http://localhost:5000/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                if (response.data.token) {
                  navigate("/dashboard");
                }
              }}
              label={"Signup"}
            />
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
