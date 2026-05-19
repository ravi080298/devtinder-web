import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("raviraj.kapor@gmail.com");
  const [password, setPassWord] = useState("raviraj.c@223");
  const disptach = useDispatch();
  const navigate = useNavigate();
  function submitLoginForm() {
    console.log(emailId, password);
    loginAPI();
  }

  async function loginAPI() {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      console.log(response.data);
      disptach(addUser(response.data));
      return navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="card bg-primary text-primary-content w-96 flex items-center">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Username</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-end">
            <button className="btn" onClick={submitLoginForm}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
