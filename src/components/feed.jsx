import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../redux/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import Card from "./card";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);

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

  async function handleInterestedOrIgnore(status) {
    console.log(status, feed[0]);
    try {
      const response = await axios.post(
        `http://localhost:3000/request/send/${status}/${feed[0]?._id}`,
        {},
        { withCredentials: true },
      );
      console.log(response, "response");
      if (response.data.statusCode === 200) {
        fetchViewApi();
      }
    } catch (error) {}
  }

  return (
    <div className="flex justify-center p-8">
      {feed && feed.length > 0 && (
        <Card
          data={{
            firstName: feed[0].firstName,
            lastName: feed[0].lastName,
            age: feed[0].age,
            photo: feed[0].photo,
            about: feed[0].about,
          }}
          onClickButton={handleInterestedOrIgnore}
        />
      )}
    </div>
  );
};

export default Feed;
