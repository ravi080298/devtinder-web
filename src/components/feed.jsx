import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../redux/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import Card from "./card";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchViewApi = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/feed", {
        withCredentials: true,
      });
      dispatch(addfeed(response?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchViewApi();
  }, []);
  return (
    <div className="flex justify-center p-8">
      {feed &&
        feed.length > 0 &&
        feed.map((item, index) => {
          return <Card key={`${index}_card`} data={item} />;
        })}
    </div>
  );
};

export default Feed;
