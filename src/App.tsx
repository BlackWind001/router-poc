import React from "react";
import "./App.css";
import Router from "./router";
import Home from "./pages/home";
import About from "./pages/about";

function App() {
  const [view, setView] = React.useState<React.ReactNode | null>(null);
  React.useEffect(() => {
    Router.register("/", <Home />);
    Router.register("/about", <About />);
  }, []);

  React.useEffect(() => {
    const { pathname: initialPath } = window.location;

    if (initialPath in Router.pages) {
      setView(Router.pages[initialPath]);
    }
  }, []);

  return view;
}

export default App;
