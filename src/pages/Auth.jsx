import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex ">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/auth/login`, {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3001/auth/register`, {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-zinc-400">
      <form onSubmit={onSubmit} className="py-10 px-5 border-zinc-300 border-2">
        <h2 className="mb-4 text-3xl font-semibold">{label}</h2>
        <div className="my-10 text-black text-xl">
          <label htmlFor="username">Username: </label>
          <input
            className="border-2 border-black rounded-md p-1 m-1"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="ml-1 text-black text-xl">
          <label className="mr-2" htmlFor="password">
            Password:
          </label>
          <input
            className="border-2 border-black rounded-md p-1 m-1"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="mt-5 ml-20 bg-zinc-900 text-white p-2 rounded-md"
          type="submit"
        >
          {label}
        </button>
      </form>
    </div>
  );
};

export default Auth;
