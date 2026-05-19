import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import RouteFunc from "./routes";

function App() {
  return (
    <Provider store={store}>
      <RouteFunc />
    </Provider>
  );
}

export default App;
