import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/body";
import Login from "./components/login";
import Profile from "./components/profile";
import Feed from "./components/feed";
import Connections from "./components/connections";
import Request from "./components/requests";

const RouteFunc = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteFunc;
