import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 h-max text-center p-2 px-4 m-20 ">
          <Heading label={"Welcome Back!"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <Input
            onChange={(e) => setUsername(e.target.value)}
            label={"Username"}
            placeholder={"john@gmail.com"}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"*****"}
          />
          <Button
            onPress={async () => {
              const response = await axios.post(
                "http://localhost:5000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              if (response.data.token) {
                navigate("/dashboard");
              }
            }}
            label={"Sign in"}
          />
          <div className="m-3">
            New User? Create account{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
2;
