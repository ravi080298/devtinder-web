import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../redux/userslice";
import { BASE_URL } from "../api/basepath";

const Body = () => {
  const userInfo = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchViewApi = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (err) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!userInfo) fetchViewApi();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
