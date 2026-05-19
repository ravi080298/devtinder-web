import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveRequest } from "../redux/requestSlice";

const Request = () => {
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState("");
  const receiveRequestList = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/request/receive",
        { withCredentials: true },
      );
      dispatch(receiveRequest(response?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  async function acceptOrRejectRequest(status, id) {
    try {
      const response = await axios.post(
        `http://localhost:3000/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      setShowToast(true);
      setStatus(status.replace(/^./, (char) => char.toUpperCase()));
      setTimeout(() => {
        setShowToast(false);
        fetchRequests();
      }, 3000);
    } catch (error) {}
  }
  console.log(receiveRequestList, "receiveRequestList");
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center rounded-lg max-auto">
        <div>Connection Requests</div>
        <div className="flex flex-col gap-2 bg-base-300 w-1/2">
          {receiveRequestList?.length === 0 && (
            <div className="card card-side bg-base-300 shadow-sm">
              No Request Found
            </div>
          )}
          {receiveRequestList?.length > 0 &&
            receiveRequestList.map((item, index) => {
              return (
                <div className="flex gap-2 justify-between  m-4 p-4">
                  <div
                    key={item?._id}
                    className="card card-side bg-base-300 shadow-sm"
                  >
                    <figure>
                      <img
                        className="w-20 h-20"
                        src={item?.fromUserID?.photo}
                        alt="photo"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {item?.fromUserID?.firstName}{" "}
                        {item?.fromUserID?.lastName}
                      </h2>
                      {item?.fromUserID?.about && (
                        <p>{item?.fromUserID?.about}</p>
                      )}
                    </div>
                  </div>
                  <div className=" flex justify-center items-center gap-4">
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() =>
                        acceptOrRejectRequest("rejected", item?._id)
                      }
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        acceptOrRejectRequest("accepted", item?._id)
                      }
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{status} Request.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Request;
