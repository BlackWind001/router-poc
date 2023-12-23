import React from "react";
import router from ".";
import routerEvent from "./routerEvent";

interface routes {
  route: string;
  view: React.ReactNode;
}

interface RouteSwitchProps {
  routeCases: routes[];
}

export function RouteSwitch({ routeCases = [] }: RouteSwitchProps) {
  const [view, setView] = React.useState<React.ReactNode>(null);
  const [validRoutes, setValidRouteCases] = React.useState<string[]>([]);
  const [pathChanged, setPathChanged] = React.useState(0);

  function filterValidRouteCases() {
    const validRouteCases = routeCases
      .filter((routeCase) => {
        if (
          typeof routeCase.route !== "string" ||
          !React.isValidElement(routeCase.view)
        ) {
          return false;
        }
        router.register(routeCase.route, routeCase.view);
        return true;
      })
      .map((routeCase) => {
        return routeCase.route;
      });

    setValidRouteCases(validRouteCases);
  }

  React.useEffect(() => {
    routerEvent.addEventListener("path-changed", () => {
      setPathChanged(Math.random());
    });

    filterValidRouteCases();
  }, []);

  React.useEffect(() => {
    filterValidRouteCases();
  }, [routeCases]);

  // Once the routeCases are filtered, find the
  // view for the current route.
  // If not a registered route, set view to null.
  React.useEffect(() => {
    const currentPath = window.location.pathname;

    if (validRoutes.length <= 0) {
      return;
    }

    const matchingRoute = validRoutes.find((route) => {
      const isDynamicRoute = false;

      if (!route) {
        return;
      }

      // The isDynamicRoute value created above 👆 is
      // currently just a placeholder for dynamic routes
      // like /about/:id or /route/* or /home/**

      if (route.startsWith(currentPath) && !isDynamicRoute) {
        return true;
      }

      return false;
    });

    if (!matchingRoute) {
      return;
    }

    setView(router.getView(matchingRoute) || null);
  }, [validRoutes, pathChanged]);

  return view;
}
