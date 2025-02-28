import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import { RouteOptions, routes } from "./RoutesConfig";


const getBrowserRouter = (routes: RouteOptions[]) => {
  const routerObjects: RouteObject[] = routes.map((route: RouteOptions) => {
    const routerObject: RouteObject = {
      id: route.key,
      path: route.path,
      element: route.element,
    };

 

    if (route.isProtected) {
      // eslint-disable-next-line no-self-assign
      routerObject.element = routerObject.element; // but wrapped
    }

    return routerObject;
  });

  const router = createBrowserRouter(routerObjects);
  return router;
};

const Router = () => {
  const router = getBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;