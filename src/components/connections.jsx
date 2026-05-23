import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/connectionslice";
import { BASE_URL } from "../api/basepath";

const Connections = () => {
  const connectionList = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="flex flex-col gap-2 justify-center align-center  rounded-lg bg-base-300 w-1/2 mx-auto  m-4 p-4">
      {connectionList?.length > 0 &&
        connectionList.map((item, index) => {
          return (
            <div
              key={item?._id}
              className="card card-side bg-base-100 shadow-sm"
            >
              <figure>
                <img
                  className="w-20 h-20"
                  src={item?.toUserID?.photo}
                  alt="photo"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item?.toUserID?.firstName} {item?.toUserID?.lastName}
                </h2>
                {item?.toUserID?.about && <p>{item?.toUserID?.about}</p>}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Connections;
