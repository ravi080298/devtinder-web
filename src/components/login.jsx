import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userslice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/basepath";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [emailId, setEmailId] = useState("raviraj.kapor@gmail.com");
  const [password, setPassWord] = useState("raviraj.c@223");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  function submitLoginOrSignupForm() {
    if (isLogin) {
      loginAPI();
    } else {
      signUpApi();
    }
  }

  async function loginAPI() {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      disptach(addUser(response?.data?.data));
      setMessage(response.data.message);
      navigate("/feed");
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError("Something went Wrong!");
    }
  }

  async function signUpApi() {
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true },
      );
      setMessage(response.data.message);
      disptach(addUser(response?.data?.data));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      navigate("/profile");
    } catch (err) {
      setError("Something went Wrong!");
    }
  }
  return (
    <>
      <div className="flex items-center justify-center h-full w-full ">
        <div className="card bg-primary text-primary-content w-96 flex items-center">
          <div className="card-body flex flex-col justify-center items-center">
            <h2 className="card-title">{isLogin ? "Login" : "SignUp"}</h2>
            <div>
              {!isLogin && (
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">FirstName:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              )}
              {!isLogin && (
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">LastName:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              )}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">eamilID:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Type here"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Password:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Type here"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="cursor-pointer card-actions justify-end">
              <button className="btn" onClick={submitLoginOrSignupForm}>
                {isLogin ? "Login" : "SignUp"}
              </button>
            </div>
            <div>
              <p
                onClick={() => setIsLogin((prev) => !prev)}
                className="cursor-pointer py-2 label-text"
              >
                {isLogin ? "Existing User? Login" : "New user?SignUp"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
