import { Routes, Route } from "react-router-dom";
import routes from "../routes/route.config";

const renderRoutes = (routes) =>
  routes.map((route, index) => {
    const { path, element, children } = route;

    return (
      <Route key={path ?? index} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    );
  });

const AppRouter = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRouter;
