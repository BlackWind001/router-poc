import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import { RouteSwitch } from "./router/RouteSwitchCase";

function App() {
  return (
    <>
      <RouteSwitch
        routeCases={[
          { route: "/", view: <Home /> },
          { route: "/about", view: <About /> },
        ]}
      />
    </>
  );
}

export default App;
